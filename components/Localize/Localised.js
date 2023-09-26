import LocalizedStrings from 'react-native-localization';
import en from './locales/en';
import fr from './locales/fr';

let Translated = new LocalizedStrings({
    en:en,fr:fr
})

export const changeLanguage = (langkey) => {
    Translated.setLanguage(langkey)
} 

export default Translated