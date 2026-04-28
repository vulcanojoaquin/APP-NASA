import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/traslation.json";
import es from "./locales/es/traslation.json";

const savedLanguage = localStorage.getItem("lang") || "es";


i18n.use(initReactI18next).init({

    resources: {
        es: {
            translation: es,
        },
        en: {
            translation: en,
        }
    },
    lng: savedLanguage,
    fallbackLng: "es",
    interpolation: {
        escapeValue: false
    }

})

export default i18n