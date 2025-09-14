import { Sun, Battery, Zap, Grid3X3, AlertTriangle, Home } from 'lucide-react';
import { MonitoringCard } from '@/components/dashboard/MonitoringCard';
import { EnergyChart } from '@/components/dashboard/EnergyChart';
import { StatusIndicator } from '@/components/dashboard/StatusIndicator';
import { LoadControlPanel } from '@/components/dashboard/LoadControlPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { t } = useLanguage();

  // Mock real-time data - in real app this would come from API/WebSocket
  const systemData = {
    solar: {
      currentPower: 7.2,
      dailyGeneration: 45.8,
      totalGeneration: 12450,
    },
    battery: {
      soc: 87,
      chargingRate: 2.1,
      status: 'charging' as const,
    },
    load: {
      totalLoad: 4.8,
      householdConsumption: 3.2,
    },
    grid: {
      status: 'connected' as const,
    },
  };

  const alerts = [
    {
      id: 1,
      type: 'warning' as const,
      message: 'Panel cleaning recommended - 5% efficiency drop detected',
      timestamp: '2 hours ago',
    },
  ];

  return (
    <Tabs defaultValue="monitoring" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="monitoring">{t('dashboard')}</TabsTrigger>
        <TabsTrigger value="control">{t('loadControl')}</TabsTrigger>
      </TabsList>

      <TabsContent value="monitoring" className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MonitoringCard
            title={t('solarGeneration')}
            value={systemData.solar.currentPower}
            unit={t('kw')}
            icon={Sun}
            trend={12.5}
            status="success"
          >
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>{t('dailyGeneration')}:</span>
                <span>{systemData.solar.dailyGeneration} {t('kwh')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('totalGeneration')}:</span>
                <span>{systemData.solar.totalGeneration.toLocaleString()} {t('kwh')}</span>
              </div>
            </div>
          </MonitoringCard>

          <MonitoringCard
            title={t('batteryStatus')}
            value={systemData.battery.soc}
            unit={t('percent')}
            icon={Battery}
            status={systemData.battery.soc > 80 ? 'success' : systemData.battery.soc > 20 ? 'warning' : 'error'}
          >
            <div className="mt-3 space-y-2">
              <Progress value={systemData.battery.soc} className="h-2" />
              <div className="flex justify-between text-xs">
                <StatusIndicator 
                  status={systemData.battery.status} 
                  label={t(systemData.battery.status)} 
                />
                <span className="text-muted-foreground">
                  {systemData.battery.chargingRate} {t('kw')}
                </span>
              </div>
            </div>
          </MonitoringCard>

          <MonitoringCard
            title={t('loadConsumption')}
            value={systemData.load.totalLoad}
            unit={t('kw')}
            icon={Home}
            trend={-3.2}
            status="info"
          >
            <div className="mt-3 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>{t('householdConsumption')}:</span>
                <span>{systemData.load.householdConsumption} {t('kw')}</span>
              </div>
            </div>
          </MonitoringCard>

          <MonitoringCard
            title={t('gridStatus')}
            value={systemData.grid.status === 'connected' ? t('connected') : t('disconnected')}
            unit=""
            icon={Grid3X3}
            status={systemData.grid.status === 'connected' ? 'success' : 'error'}
          >
            <div className="mt-3">
              <StatusIndicator 
                status={systemData.grid.status} 
                label={systemData.grid.status === 'connected' ? t('connected') : t('disconnected')} 
              />
            </div>
          </MonitoringCard>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnergyChart 
            title={`${t('solarGeneration')} & ${t('loadConsumption')} (Today)`}
            type="area"
          />
          <EnergyChart 
            title={`${t('batteryStatus')} Trends (Today)`}
            type="line"
          />
        </div>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              {t('alerts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {t('noAlerts')}
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <Alert key={alert.id} variant={alert.type === 'warning' ? 'default' : 'destructive'}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="flex justify-between items-start">
                      <span>{alert.message}</span>
                      <span className="text-xs text-muted-foreground ml-4">
                        {alert.timestamp}
                      </span>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="control" className="space-y-6">
        <LoadControlPanel />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;