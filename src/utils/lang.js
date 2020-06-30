import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localSet , localGet } from "../local-storage";

import enLocale from '../renderer/assest/def/language/en-US'
import zhLocale from '../renderer/assest/def/language/zh-CN'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
}

export const languageNames = Object.keys(messages);

const KEY = 'language';
export function getLanguage() {
    let language = localGet(KEY);
    if (language == null){
        language = 'zh';
        localSet(KEY , language);
    }
    return language;
}

export function setLangue( language ) {
    localSet(KEY , language);
}

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: getLanguage(),
    // set locale messages
    messages
});

export default i18n