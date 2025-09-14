interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'charging' | 'discharging' | 'connected' | 'disconnected';
  label: string;
  className?: string;
}

const statusConfig = {
  online: { color: 'bg-success', textColor: 'text-success' },
  offline: { color: 'bg-destructive', textColor: 'text-destructive' },
  charging: { color: 'bg-success', textColor: 'text-success' },
  discharging: { color: 'bg-warning', textColor: 'text-warning' },
  connected: { color: 'bg-success', textColor: 'text-success' },
  disconnected: { color: 'bg-destructive', textColor: 'text-destructive' },
};

export const StatusIndicator = ({ status, label, className = '' }: StatusIndicatorProps) => {
  const config = statusConfig[status];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        <div className={`absolute inset-0 w-2 h-2 rounded-full ${config.color} animate-ping opacity-75`} />
      </div>
      <span className={`text-sm font-medium ${config.textColor}`}>{label}</span>
    </div>
  );
};