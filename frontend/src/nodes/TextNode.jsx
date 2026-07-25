import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Position, Handle, useUpdateNodeInternals } from 'reactflow';
import { Type } from 'lucide-react';
import BaseNode from './BaseNode';

// Regex to detect {{ variableName }} As In The Assignment
const VARIABLE_REGEX = /\{\{\s*(\w+)\s*\}\}/g;

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data.text || '');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    const uniqueVars = [...new Set(matches.map((m) => m[1]))];
    return uniqueVars;
  }, [text]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, updateNodeInternals]);

  // This Is The Adjusting Textarea That You Gave Me In Assignment
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(60, textarea.scrollHeight)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    data.onChange?.(id, newText);
  };

  return (
    <div className="relative">
      {variables.map((variable, index) => (
        <Handle
          key={`api-${variable}`}
          type="target"
          position={Position.Left}
          id={`api-${variable}`}
          className="w-3 h-3 border-2 border-card handle-api transition-transform hover:scale-125"
          style={{
            top: `${65 + index * 30}px`,
          }}
          title={variable}
        />
      ))}

      <BaseNode
        title={data.label || 'Text'}
        icon={<Type size={16} />}
        selected={selected}
        handles={[
          {
            type: 'target',
            position: Position.Left,
            id: 'input',
            style: { top: '24px' },
          },
          {
            type: 'source',
            position: Position.Right,
            id: 'output',
          },
        ]}
      >
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Text Content
          </label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Enter text... Use {{ variable }} for dynamic content"
            className="w-full min-h-[60px] px-2 py-1.5 text-sm font-mono bg-secondary border border-node-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden"
            rows={2}
          />
          {variables.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {variables.map((v) => (
                <span
                  key={v}
                  className="px-1.5 py-0.5 text-xs font-mono bg-handle-api/20 text-handle-api rounded"
                >
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>
      </BaseNode>
    </div>
  );
};

export default TextNode;