import { Upload, Download, Type, Brain, Filter, Shuffle, GitMerge, GitBranch, Repeat} from 'lucide-react';

const nodeItems = [
  { type: 'InputNode', label: 'Input', icon: Upload },
  { type: 'OutputNode', label: 'Output', icon: Download },
  { type: 'TextNode', label: 'Text', icon: Type },
  { type: 'LLMNode', label: 'LLM', icon: Brain },
  { type: 'FilterNode', label: 'Filter', icon: Filter },
  { type: 'TransformNode', label: 'Transform', icon: Shuffle },
  { type: 'MergeNode', label: 'Merge', icon: GitMerge },
  { type: 'ConditionalNode', label: 'Conditional', icon: GitBranch },
  { type: 'LoopNode', label: 'Loop', icon: Repeat },
];

export const Toolbar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-card border border-node-border rounded-xl p-3 shadow-lg">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Nodes
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {nodeItems.map(({ type, label, icon: Icon }) => (
          <div
            key={type}
            className="flex flex-col items-center gap-1.5 p-2 bg-secondary hover:bg-secondary/80 border border-transparent hover:border-primary/30 rounded-lg cursor-grab active:cursor-grabbing transition-all group"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
          >
            <Icon
              size={20}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
