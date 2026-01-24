import { Position } from 'reactflow';
import { Download } from 'lucide-react';
import BaseNode from './BaseNode';

export const OutputNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Output'}
      icon={<Download size={16} />}
      selected={selected}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: 'input',
        },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Output Format
        </label>
        <select className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="text">Text</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
