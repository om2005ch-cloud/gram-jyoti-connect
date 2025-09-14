import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MonitoringCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
  children?: ReactNode;
  className?: string;
}

const statusColors = {
  success: 'text-success border-success/20 bg-success/5',
  warning: 'text-warning border-warning/20 bg-warning/5',
  error: 'text-destructive border-destructive/20 bg-destructive/5',
  info: 'text-primary border-primary/20 bg-primary/5',
};

export const MonitoringCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  status = 'info',
  children,
  className = '' 
}: MonitoringCardProps) => {
  return (
    <Card className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${statusColors[status]} ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-sm font-medium">
          <div className={`p-2 rounded-lg bg-card`}>
            <Icon className="h-4 w-4" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {trend !== undefined && (
          <div className={`text-xs flex items-center gap-1 ${
            trend > 0 ? 'text-success' : trend < 0 ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%
          </div>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
};