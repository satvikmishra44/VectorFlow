import { Position } from 'reactflow';
import { GitMerge } from 'lucide-react';
import BaseNode from './BaseNode';

export const MergeNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Merge'}
      icon={<GitMerge size={16} />}
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input-a', style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: 'input-b', style: { top: '65%' } },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Merge Strategy
        </label>
        <select className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="concat">Concatenate</option>
          <option value="join">Join</option>
          <option value="array">Array</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default MergeNode;
