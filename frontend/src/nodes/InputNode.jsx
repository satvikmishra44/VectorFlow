import { Position } from 'reactflow';
import { Upload } from 'lucide-react';
import BaseNode from './BaseNode';

export const InputNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Input'}
      icon={<Upload size={16} />}
      selected={selected}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: 'output',
        },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Input Type
        </label>
        <select className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="url">URL</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default InputNode;
