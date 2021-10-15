import i18n from "i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import moment from 'moment';
import { lng } from './credentials'

const fallbackLng = [lng]; 
const availableLanguages = [lng];

availableLanguages.forEach((element) => {
    if (element !== lng) {
       import(`moment/locale/${element}`);
     }
  });

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === 'currentDate') return 
           moment(value).locale(lng).format('LL');
          return value;
       },
    }
  });