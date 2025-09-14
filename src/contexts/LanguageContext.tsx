import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'od';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    od: string;
  };
}

const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', od: 'ଡ୍ୟାସବୋର୍ଡ' },
  gramJyoti: { en: 'Gram Jyoti', hi: 'ग्राम ज्योति', od: 'ଗ୍ରାମ ଜ୍ୟୋତି' },
  microgridMonitor: { en: 'Microgrid Controller Monitor', hi: 'माइक्रोग्रिड नियंत्रक मॉनिटर', od: 'ମାଇକ୍ରୋଗ୍ରିଡ୍ ନିୟନ୍ତ୍ରକ ମନିଟର' },
  
  // System Status
  online: { en: 'Online', hi: 'ऑनलाइन', od: 'ଅନଲାଇନ୍' },
  offline: { en: 'Offline', hi: 'ऑफलाइन', od: 'ଅଫଲାଇନ୍' },
  systemStatus: { en: 'System Status', hi: 'सिस्टम स्थिति', od: 'ସିଷ୍ଟମ୍ ସ୍ଥିତି' },
  
  // Solar Generation
  solarGeneration: { en: 'Solar Generation', hi: 'सौर उत्पादन', od: 'ସୌର ଉତ୍ପାଦନ' },
  currentPower: { en: 'Current Power', hi: 'वर्तमान शक्ति', od: 'ବର୍ତ୍ତମାନ ଶକ୍ତି' },
  dailyGeneration: { en: 'Daily Generation', hi: 'दैनिक उत्पादन', od: 'ଦୈନିକ ଉତ୍ପାଦନ' },
  totalGeneration: { en: 'Total Generation', hi: 'कुल उत्पादन', od: 'ମୋଟ ଉତ୍ପାଦନ' },
  
  // Battery Status
  batteryStatus: { en: 'Battery Status', hi: 'बैटरी स्थिति', od: 'ବ୍ୟାଟେରୀ ସ୍ଥିତି' },
  stateOfCharge: { en: 'State of Charge', hi: 'चार्ज की स्थिति', od: 'ଚାର୍ଜ ସ୍ଥିତି' },
  charging: { en: 'Charging', hi: 'चार्जिंग', od: 'ଚାର୍ଜିଙ୍ଗ' },
  discharging: { en: 'Discharging', hi: 'डिस्चार्जिंग', od: 'ଡିସଚାର୍ଜିଙ୍ଗ' },
  chargingRate: { en: 'Charging Rate', hi: 'चार्ज दर', od: 'ଚାର୍ଜ ଦର' },
  
  // Load Consumption
  loadConsumption: { en: 'Load Consumption', hi: 'लोड खपत', od: 'ଲୋଡ୍ ଖର୍ଚ୍ଚ' },
  totalLoad: { en: 'Total Load', hi: 'कुल लोड', od: 'ମୋଟ ଲୋଡ୍' },
  householdConsumption: { en: 'Household Consumption', hi: 'घरेलू खपत', od: 'ଘରେଲୁ ଖର୍ଚ୍ଚ' },
  
  // Grid Status
  gridStatus: { en: 'Grid Status', hi: 'ग्रिड स्थिति', od: 'ଗ୍ରିଡ୍ ସ୍ଥିତି' },
  connected: { en: 'Connected', hi: 'कनेक्टेड', od: 'ସଂଯୁକ୍ତ' },
  disconnected: { en: 'Disconnected', hi: 'डिसकनेक्टेड', od: 'ବିଚ୍ଛିନ୍ନ' },
  
  // Alerts
  alerts: { en: 'Alerts', hi: 'अलर्ट', od: 'ଚେତାବନୀ' },
  noAlerts: { en: 'No active alerts', hi: 'कोई सक्रिय अलर्ट नहीं', od: 'କୌଣସି ସକ୍ରିୟ ଚେତାବନୀ ନାହିଁ' },
  critical: { en: 'Critical', hi: 'गंभीर', od: 'ଗୁରୁତର' },
  warning: { en: 'Warning', hi: 'चेतावनी', od: 'ଚେତାବନୀ' },
  
  // Units
  kw: { en: 'kW', hi: 'किलोवाट', od: 'କିଲୋୱାଟ' },
  kwh: { en: 'kWh', hi: 'किलोवाट घंटा', od: 'କିଲୋୱାଟ ଘଣ୍ଟା' },
  percent: { en: '%', hi: '%', od: '%' },
  
  // Time
  lastUpdated: { en: 'Last Updated', hi: 'अंतिम अपडेट', od: 'ଶେଷ ଅପଡେଟ୍' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};