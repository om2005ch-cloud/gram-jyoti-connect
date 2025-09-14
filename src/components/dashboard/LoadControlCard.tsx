import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideIcon, Power, Timer, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface LoadDevice {
  id: string;
  name: string;
  icon: LucideIcon;
  status: 'on' | 'off' | 'scheduled';
  mode: 'manual' | 'auto' | 'scheduled';
  powerConsumption: number;
  scheduleStart?: string;
  scheduleEnd?: string;
}

interface LoadControlCardProps {
  device: LoadDevice;
  onToggle: (deviceId: string, newStatus: 'on' | 'off') => void;
  onModeChange: (deviceId: string, newMode: 'manual' | 'auto') => void;
}

export const LoadControlCard = ({ device, onToggle, onModeChange }: LoadControlCardProps) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      const newStatus = checked ? 'on' : 'off';
      onToggle(device.id, newStatus);
      
      toast.success(`${device.name} ${newStatus === 'on' ? t('turnOn') : t('turnOff')}`, {
        description: `${t('powerConsumption')}: ${device.powerConsumption} ${t('kw')}`,
      });
    } catch (error) {
      toast.error('Failed to control device');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeToggle = () => {
    const newMode = device.mode === 'manual' ? 'auto' : 'manual';
    onModeChange(device.id, newMode);
    toast.info(`${device.name} set to ${t(newMode)} mode`);
  };

  const getStatusColor = () => {
    switch (device.status) {
      case 'on': return 'success';
      case 'off': return 'destructive';
      case 'scheduled': return 'warning';
      default: return 'secondary';
    }
  };

  const Icon = device.icon;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${device.status === 'on' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{device.name}</span>
          </div>
          <Badge variant={getStatusColor() as any} className="text-xs">
            {t(device.status === 'on' ? 'running' : device.status === 'off' ? 'stopped' : 'scheduled')}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Power Consumption */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Zap className="h-3 w-3" />
            {t('powerConsumption')}
          </span>
          <span className="font-medium">
            {device.status === 'on' ? device.powerConsumption : 0} {t('kw')}
          </span>
        </div>

        {/* Schedule Info */}
        {device.status === 'scheduled' && device.scheduleStart && device.scheduleEnd && (
          <div className="flex items-center justify-between text-sm bg-warning/10 p-2 rounded">
            <span className="text-warning flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {t('scheduled')}
            </span>
            <span className="text-warning font-medium">
              {device.scheduleStart} - {device.scheduleEnd}
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Power className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={device.status === 'on'}
              onCheckedChange={handleToggle}
              disabled={device.mode === 'auto' || device.status === 'scheduled' || isLoading}
            />
          </div>
          
          <Button
            variant={device.mode === 'manual' ? 'default' : 'secondary'}
            size="sm"
            onClick={handleModeToggle}
            className="text-xs"
          >
            {t(device.mode)}
          </Button>
        </div>
        
        {device.mode === 'auto' && (
          <p className="text-xs text-muted-foreground">
            {t('auto')} mode active - controlled by system
          </p>
        )}
      </CardContent>
    </Card>
  );
};