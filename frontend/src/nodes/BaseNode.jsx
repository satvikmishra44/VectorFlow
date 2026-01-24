import { Handle} from 'reactflow';
import { cn } from '@/lib/utils';

export const BaseNode = ({
  title,
  icon,
  children,
  handles = [],
  className,
  headerClassName,
  selected,
}) => {
  return (
    <div
      className={cn(
        'min-w-[200px] bg-card border border-node-border rounded-xl transition-all duration-200',
        selected && 'ring-2 ring-primary shadow-xl',
        !selected && 'shadow-lg hover:shadow-xl',
        className
      )}
      style={{
        boxShadow: selected 
          ? '0 8px 32px -8px hsl(var(--primary) / 0.3)' 
          : '0 4px 20px -4px hsl(var(--node-shadow) / 0.15)',
      }}
    >
      {/* Header */}
      <div
        className={cn(
          'px-3 py-2.5 bg-node-header border-b border-node-border rounded-t-xl flex items-center gap-2',
          headerClassName
        )}
      >
        {icon && (
          <span className="text-primary flex-shrink-0">
            {icon}
          </span>
        )}
        <span className="font-semibold text-sm text-foreground truncate">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="p-3">
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={cn(
            'w-3 h-3 border-2 border-card transition-transform hover:scale-125',
            handle.type === 'target' ? 'handle-input' : 'handle-output',
            handle.className
          )}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;
