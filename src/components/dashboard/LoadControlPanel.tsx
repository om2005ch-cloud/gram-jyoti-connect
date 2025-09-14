import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadControlCard } from './LoadControlCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Lightbulb, 
  Droplets, 
  Building, 
  GraduationCap, 
  Heart, 
  Sprout,
  Settings,
  Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LoadDevice {
  id: string;
  name: string;
  icon: any;
  status: 'on' | 'off' | 'scheduled';
  mode: 'manual' | 'auto' | 'scheduled';
  powerConsumption: number;
  scheduleStart?: string;
  scheduleEnd?: string;
}

export const LoadControlPanel = () => {
  const { t } = useLanguage();
  
  const [devices, setDevices] = useState<LoadDevice[]>([
    {
      id: 'street-lights',
      name: t('streetLights'),
      icon: Lightbulb,
      status: 'on',
      mode: 'auto',
      powerConsumption: 2.4,
      scheduleStart: '18:00',
      scheduleEnd: '06:00',
    },
    {
      id: 'water-pump',
      name: t('waterPump'),
      icon: Droplets,
      status: 'off',
      mode: 'manual',
      powerConsumption: 3.2,
    },
    {
      id: 'community-hall',
      name: t('communityHall'),
      icon: Building,
      status: 'off',
      mode: 'manual',
      powerConsumption: 1.8,
    },
    {
      id: 'school-lights',
      name: t('schoolLights'),
      icon: GraduationCap,
      status: 'scheduled',
      mode: 'scheduled',
      powerConsumption: 1.5,
      scheduleStart: '08:00',
      scheduleEnd: '16:00',
    },
    {
      id: 'health-center',
      name: t('healthCenter'),
      icon: Heart,
      status: 'on',
      mode: 'manual',
      powerConsumption: 0.8,
    },
    {
      id: 'irrigation-pump',
      name: t('irrigationPump'),
      icon: Sprout,
      status: 'off',
      mode: 'auto',
      powerConsumption: 4.5,
    },
  ]);

  const handleDeviceToggle = (deviceId: string, newStatus: 'on' | 'off') => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, status: newStatus }
        : device
    ));
  };

  const handleModeChange = (deviceId: string, newMode: 'manual' | 'auto') => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, mode: newMode }
        : device
    ));
  };

  const handleEmergencyShutdown = () => {
    setDevices(prev => prev.map(device => ({ 
      ...device, 
      status: 'off' as const,
      mode: 'manual' as const
    })));
    toast.error('Emergency shutdown activated - All devices turned off');
  };

  const totalActivePower = devices
    .filter(device => device.status === 'on')
    .reduce((sum, device) => sum + device.powerConsumption, 0);

  const activeDevices = devices.filter(device => device.status === 'on').length;

  return (
    <div className="space-y-6">
      {/* Control Panel Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-accent" />
              {t('loadControl')} - {t('manualOverride')}
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleEmergencyShutdown}
              className="gap-2"
            >
              <Power className="h-4 w-4" />
              Emergency Shutdown
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">{activeDevices}</div>
              <div className="text-sm text-muted-foreground">Active Devices</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{totalActivePower.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Total Load ({t('kw')})</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {devices.filter(d => d.mode === 'auto').length}
              </div>
              <div className="text-sm text-muted-foreground">{t('auto')} Mode</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {devices.filter(d => d.status === 'scheduled').length}
              </div>
              <div className="text-sm text-muted-foreground">{t('scheduled')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <LoadControlCard
            key={device.id}
            device={device}
            onToggle={handleDeviceToggle}
            onModeChange={handleModeChange}
          />
        ))}
      </div>
    </div>
  );
};