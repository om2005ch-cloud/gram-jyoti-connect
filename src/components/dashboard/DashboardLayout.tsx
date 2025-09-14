import { ReactNode } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, Activity } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap className="h-8 w-8 text-accent" />
                  <div className="absolute inset-0 h-8 w-8 bg-accent/20 blur-sm" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{t('gramJyoti')}</h1>
                  <p className="text-sm text-muted-foreground">{t('microgridMonitor')}</p>
                </div>
              </div>
              <StatusIndicator status="online" label={t('online')} />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>{t('lastUpdated')}: {new Date().toLocaleTimeString()}</span>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};