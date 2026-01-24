import { Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import BaseNode from './BaseNode';

export const ConditionalNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Conditional'}
      icon={<GitBranch size={16} />}
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '65%' } },
      ]}
    >
      <div className="space-y-2 relative min-h-[90px]">
        <div className="pr-16"> 
          <label className="text-xs font-medium text-muted-foreground">
            If Condition
          </label>
          <input
            type="text"
            placeholder="e.g., value === 'yes'"
            className="w-full px-2 py-1.5 text-sm font-mono bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute right-[-8px] text-[10px] font-bold text-accent uppercase flex items-center gap-1"
            style={{ top: '-10%' }} 
          >
            True <span className="text-sm">→</span>
          </div>

          <div 
            className="absolute right-[-8px] text-[10px] font-bold text-destructive uppercase flex items-center gap-1"
            style={{ top: '50%' }}
          >
            False <span className="text-sm">→</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground pt-4">
        
        </div>
      </div>
    </BaseNode>
  );
};

export default ConditionalNode;