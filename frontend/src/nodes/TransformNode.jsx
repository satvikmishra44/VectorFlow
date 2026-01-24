import { Position } from 'reactflow';
import { Shuffle } from 'lucide-react';
import BaseNode from './BaseNode';

export const TransformNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Transform'}
      icon={<Shuffle size={16} />}
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Operation
        </label>
        <select className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="split">Split</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default TransformNode;
