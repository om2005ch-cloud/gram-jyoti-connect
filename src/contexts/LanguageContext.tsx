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
  
  // Load Controls
  loadControl: { en: 'Load Control', hi: 'लोड नियंत्रण', od: 'ଲୋଡ୍ ନିୟନ୍ତ୍ରଣ' },
  manualOverride: { en: 'Manual Override', hi: 'मैन्युअल ओवरराइड', od: 'ମାନୁଆଲ୍ ଓଭର୍‌ରାଇଡ୍' },
  streetLights: { en: 'Street Lights', hi: 'सड़क की रोशनी', od: 'ରାସ୍ତାର ଆଲୋକ' },
  waterPump: { en: 'Water Pump', hi: 'पानी का पंप', od: 'ପାଣି ପମ୍ପ' },
  communityHall: { en: 'Community Hall', hi: 'सामुदायिक भवन', od: 'ସମ୍ପ୍ରଦାୟ ହଲ୍' },
  schoolLights: { en: 'School Lights', hi: 'स्कूल की रोशनी', od: 'ବିଦ୍ୟାଳୟ ଆଲୋକ' },
  healthCenter: { en: 'Health Center', hi: 'स्वास्थ्य केंद्र', od: 'ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର' },
  irrigationPump: { en: 'Irrigation Pump', hi: 'सिंचाई पंप', od: 'ଜଳସେଚନ ପମ୍ପ' },
  
  // Control States
  turnOn: { en: 'Turn On', hi: 'चालू करें', od: 'ଚାଲୁ କରନ୍ତୁ' },
  turnOff: { en: 'Turn Off', hi: 'बंद करें', od: 'ବନ୍ଦ କରନ୍ତୁ' },
  auto: { en: 'Auto', hi: 'स्वचालित', od: 'ସ୍ୱୟଂଚାଳିତ' },
  manual: { en: 'Manual', hi: 'मैन्युअल', od: 'ମାନୁଆଲ୍' },
  scheduled: { en: 'Scheduled', hi: 'निर्धारित', od: 'ନିର୍ଦ୍ଧାରିତ' },
  
  // Status
  running: { en: 'Running', hi: 'चालू', od: 'ଚାଲୁଛି' },
  stopped: { en: 'Stopped', hi: 'बंद', od: 'ବନ୍ଦ' },
  powerConsumption: { en: 'Power Consumption', hi: 'ऊर्जा खपत', od: 'ଶକ୍ତି ଖର୍ଚ୍ଚ' },
  
  // Time & Schedule
  schedule: { en: 'Schedule', hi: 'समयसूची', od: 'ସମୟସୂଚୀ' },
  duration: { en: 'Duration', hi: 'अवधि', od: 'ଅବଧି' },
  startTime: { en: 'Start Time', hi: 'प्रारंभ समय', od: 'ଆରମ୍ଭ ସମୟ' },
  endTime: { en: 'End Time', hi: 'समाप्ति समय', od: 'ସମାପ୍ତି ସମୟ' },
  
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