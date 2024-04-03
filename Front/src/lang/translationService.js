import en from './translations/en.json'
import fr from './translations/fr.json'
import jp from './translations/jp.json'
import es from './translations/es.json'
import kr from './translations/kr.json'


const translations = {
    en: en,
    fr: fr,
    jp: jp,
    es: es,
    kr: kr,

};
export function changeLanguage(lang) {
    import(`./translations/${lang}.json`)
        .then((translations) => {
            this.$data.translations[lang] = translations;
        })
        .catch((error) => {
            console.error(`Failed to load translations for ${lang}`, error);
        });
    this.$store.state.user.lang = lang;
}
export function translate(key) {
    const lang = this.$store.getters['user/getLang'];
    if (!(lang in translations)) {
        console.error(`Language ${lang} not supported`);
        return key;
    }

    const translation = translations[lang][key];

    if (!translation) {
        console.warn(`Translation for key ${key} not found in ${lang}`);
        return key;
    }

    return translation;
}
