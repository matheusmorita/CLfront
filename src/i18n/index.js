import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import ENUS from './locales/en/en-us.json';
import PTBR from './locales/pt/pt-br.json';

export const handleChangeLanguage = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return localStorage.getItem('language')
    }
}

const resources = {
    "en-US": ENUS,
    "pt-BR": PTBR,
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: handleChangeLanguage(),
        interpolation: {
            escapeValue: false
        }
    })

export default i18next;