import { Position } from 'reactflow';
import { Filter } from 'lucide-react';
import BaseNode from './BaseNode';

export const FilterNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Filter'}
      icon={<Filter size={16} />}
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Condition
        </label>
        <input
          type="text"
          placeholder="e.g., length > 10"
          className="w-full px-2 py-1.5 text-sm font-mono bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </BaseNode>
  );
};

export default FilterNode;
