import { LanguageProvider } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <LanguageProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default Index;
