import { useCallback, useMemo, useState, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState, BackgroundVariant, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/nodes';
import Toolbar from './Toolbar';
import SubmitButton from './SubmitButton';

const initialNodes = [
  {
    id: '1',
    type: 'InputNode',
    position: { x: 50, y: 100 },
    data: { label: 'User Input' },
  },
  {
    id: '2',
    type: 'TextNode',
    position: { x: 300, y: 50 },
    data: { label: 'Prompt Template', text: 'Hello {{ name }}, welcome to {{ company }}!' },
  },
  {
    id: '3',
    type: 'LLMNode',
    position: { x: 600, y: 100 },
    data: { label: 'GPT-4' },
  },
  {
    id: '4',
    type: 'OutputNode',
    position: { x: 900, y: 100 },
    data: { label: 'Response' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'output', targetHandle: 'input' },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'prompt' },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'response', targetHandle: 'input' },
];

// Context Menu
const ContextMenu = ({ id, type, top, left, right, bottom, onDelete, onDuplicate, onClose }) => {
  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="px-3 py-1 text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
        {type === 'node' ? 'Node Actions' : 'Edge Actions'}
      </div>

      {type === 'node' && (
        <button
          onClick={() => {
            onDuplicate(id);
            onClose();
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Duplicate Node
        </button>
      )}

      <button
        onClick={() => {
            onDelete(id, type);
            onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        Delete {type === 'node' ? 'Node' : 'Edge'}
      </button>
    </div>
  );
};

const FlowCanvasInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const stableNodeTypes = useMemo(() => nodeTypes, []);

  const getNewId = useCallback(() => {
    const maxId = nodes.reduce((acc, node) => {
      const numId = parseInt(node.id);
      return !isNaN(numId) && numId > acc ? numId : acc;
    }, 0);
    return `${maxId + 1}`;
  }, [nodes]);

  const duplicateNode = useCallback((id) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;

    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    const newNode = {
      ...node,
      id: getNewId(),
      position,
      data: { ...node.data },
      selected: true,
    };

    setNodes((nds) => 
      nds.map((n) => ({ ...n, selected: false })).concat(newNode)
    );
  }, [nodes, setNodes, getNewId]);

  const deleteElement = useCallback((id, type) => {
    if (type === 'node') {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    } else {
      setEdges((eds) => eds.filter((e) => e.id !== id));
    }
  }, [setNodes, setEdges]);

  const handleContextMenu = (event, id, type) => {
    event.preventDefault();
    const pane = ref.current.getBoundingClientRect();
    const cursorX = event.clientX - pane.left;
    const cursorY = event.clientY - pane.top;

    setMenu({
      id,
      type,
      top: cursorY < pane.height - 200 && cursorY,
      left: cursorX < pane.width - 200 && cursorX,
      right: cursorX >= pane.width - 200 && pane.width - cursorX,
      bottom: cursorY >= pane.height - 200 && pane.height - cursorY,
    });
  };

  const onNodeContextMenu = useCallback((event, node) => handleContextMenu(event, node.id, 'node'), []);
  const onEdgeContextMenu = useCallback((event, edge) => handleContextMenu(event, edge.id, 'edge'), []);
  const onPaneClick = useCallback(() => setMenu(null), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode = {
        id: getNewId(),
        type,
        position,
        data: { label: type.replace('Node', '') },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, getNewId]
  );

  return (
    <div className="w-full h-screen flex">
      <div className="w-64 p-4 bg-background border-r border-node-border flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">VF</span>
          </div>
          <span className="font-semibold text-lg">VectorFlow</span>
        </div>
        
        <Toolbar />
        
        <div className="mt-auto">
          <SubmitButton />
        </div>
      </div>

      <div className="flex-1 h-full relative" ref={ref}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={stableNodeTypes}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onPaneClick={onPaneClick}
          fitView
          className="bg-canvas-bg"
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="bg-canvas-bg"
            color="hsl(var(--canvas-dots))"
          />
          <Controls className="bg-card border border-node-border rounded-lg" />
          <MiniMap
            className="bg-card border border-node-border rounded-lg"
            nodeColor="hsl(var(--primary))"
            maskColor="hsl(var(--background) / 0.8)"
          />

          {menu && (
            <ContextMenu 
              {...menu} 
              onDelete={deleteElement} 
              onDuplicate={duplicateNode} 
              onClose={() => setMenu(null)} 
            />
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export const FlowCanvas = () => (
  <ReactFlowProvider>
    <FlowCanvasInner />
  </ReactFlowProvider>
);

export default FlowCanvas;