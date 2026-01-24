import { useState } from 'react';
import { Position } from 'reactflow';
import { Brain } from 'lucide-react';
import BaseNode from './BaseNode';

export const LLMNode = ({ data, selected }) => {
  const [model, setModel] = useState(data.model || 'GPT-4');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleSliderChange = (e) => {
    setTemperature(parseFloat(e.target.value));
  };

  return (
    <BaseNode
      title={model} 
      icon={<Brain size={16} />}
      selected={selected}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: 'prompt',
          style: { top: '30%' },
        },
        {
          type: 'target',
          position: Position.Left,
          id: 'system',
          style: { top: '70%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: 'response',
        },
      ]}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Model
          </label>
          <select 
            value={model}
            onChange={handleModelChange}
            className="w-full px-2 py-1.5 text-sm bg-secondary border border-node-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="GPT-4">GPT-4</option>
            <option value="Gemini 3">Gemini 3</option>
            <option value="Claude 3">Claude 3</option>
          </select>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Temperature: {temperature}
          </label>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode;