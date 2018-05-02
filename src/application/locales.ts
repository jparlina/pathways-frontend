// Unfortunately we need to load the Intl polyfill for Android. iOS has Intl
// available natively; we should see it is possibly conditionally load the
// polyfill only when needed.
import 'intl';
// Include Unicode CLDR locale data for each of our locales
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/ar.js';

import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';

export interface Locale {
    code: string;
    label: string;
    catalog: object;
}

export const locales = [
    { code: 'en', label: 'English', catalog: enMessages },
    { code: 'ar', label: 'Arabic', catalog: arMessages },
];

export const catalogs = locales.reduce((all: {[index: string]: object}, locale: Locale): object => {
    all[locale.code] = locale.catalog;
    return all;
}, {});