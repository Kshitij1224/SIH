import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.governmentSchemes': 'Government Schemes',
      'nav.aiChatbot': 'AI Chatbot',
      'nav.telemedicine': 'Telemedicine',
      'nav.videos': 'Videos',
      'nav.faq': 'FAQ',
      'nav.login': 'Login',
      
      // Login Modal
      'login.chooseType': 'Choose Login Type',
      'login.enterCredentials': 'Enter your credentials to continue',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.loginButton': 'Login',
      'login.registerButton': 'Register',
      'login.back': 'Back',
      
      // User Types
      'userType.patient': 'Patient',
      'userType.doctor': 'Doctor',
      'userType.hospital': 'Hospital',
      'userType.patientDesc': 'Access your health records and book appointments',
      'userType.doctorDesc': 'Manage patients and consultations',
      'userType.hospitalDesc': 'Manage hospital operations and staff',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.home': 'होम',
      'nav.governmentSchemes': 'सरकारी योजनाएं',
      'nav.aiChatbot': 'एआई चैटबॉट',
      'nav.telemedicine': 'टेलीमेडिसिन',
      'nav.videos': 'वीडियो',
      'nav.faq': 'सामान्य प्रश्न',
      'nav.login': 'लॉगिन',
      
      // Login Modal
      'login.chooseType': 'लॉगिन प्रकार चुनें',
      'login.enterCredentials': 'जारी रखने के लिए अपनी जानकारी दर्ज करें',
      'login.email': 'ईमेल',
      'login.password': 'पासवर्ड',
      'login.loginButton': 'लॉगिन',
      'login.registerButton': 'रजिस्टर',
      'login.back': 'वापस',
      
      // User Types
      'userType.patient': 'मरीज़',
      'userType.doctor': 'डॉक्टर',
      'userType.hospital': 'अस्पताल',
      'userType.patientDesc': 'अपने स्वास्थ्य रिकॉर्ड तक पहुंचें और अपॉइंटमेंट बुक करें',
      'userType.doctorDesc': 'मरीज़ों और परामर्श का प्रबंधन करें',
      'userType.hospitalDesc': 'अस्पताल संचालन और कर्मचारियों का प्रबंधन करें',
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.governmentSchemes': 'Planes Gubernamentales',
      'nav.aiChatbot': 'Chatbot de IA',
      'nav.telemedicine': 'Telemedicina',
      'nav.videos': 'Vídeos',
      'nav.faq': 'Preguntas Frecuentes',
      'nav.login': 'Iniciar Sesión',
      
      // Login Modal
      'login.chooseType': 'Elegir Tipo de Inicio de Sesión',
      'login.enterCredentials': 'Ingrese sus credenciales para continuar',
      'login.email': 'Correo Electrónico',
      'login.password': 'Contraseña',
      'login.loginButton': 'Iniciar Sesión',
      'login.registerButton': 'Registrarse',
      'login.back': 'Atrás',
      
      // User Types
      'userType.patient': 'Paciente',
      'userType.doctor': 'Médico',
      'userType.hospital': 'Hospital',
      'userType.patientDesc': 'Accede a tus registros médicos y agenda citas',
      'userType.doctorDesc': 'Gestiona pacientes y consultas',
      'userType.hospitalDesc': 'Gestiona operaciones y personal del hospital',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
