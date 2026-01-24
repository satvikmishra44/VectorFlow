import { Position } from 'reactflow';
import { Repeat } from 'lucide-react';
import BaseNode from './BaseNode';

export const LoopNode = ({ data, selected }) => {
  return (
    <BaseNode
      title={data.label || 'Loop'}
      icon={<Repeat size={16} />}
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'item', style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: 'done', style: { top: '65%' } },
      ]}
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Iterator
        </label>
        <select className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="forEach">For Each</option>
          <option value="map">Map</option>
          <option value="reduce">Reduce</option>
        </select>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="text-accent">→ Each Item</span>
          <span className="text-primary">→ Complete</span>
        </div>
      </div>
    </BaseNode>
  );
};

export default LoopNode;
