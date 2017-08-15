import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_AU_NAME, LANG_AU_TRANS } from './lang-au';
import { LANG_BR_NAME, LANG_BR_TRANS } from './lang-br';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';
import { LANG_IN_NAME, LANG_IN_TRANS } from './lang-in';
import { LANG_IT_NAME, LANG_IT_TRANS } from './lang-it';
import { LANG_MX_NAME, LANG_MX_TRANS } from './lang-mx';
import { LANG_UK_NAME, LANG_UK_TRANS } from './lang-uk';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations
const dictionary = {
  [LANG_AU_NAME]: LANG_AU_TRANS,
  [LANG_BR_NAME]: LANG_BR_TRANS,
  [LANG_DE_NAME]: LANG_DE_TRANS,
  [LANG_ES_NAME]: LANG_ES_TRANS,
  [LANG_FR_NAME]: LANG_FR_TRANS,
  [LANG_IN_NAME]: LANG_IN_TRANS,
  [LANG_IT_NAME]: LANG_IT_TRANS,
  [LANG_MX_NAME]: LANG_MX_TRANS,
  [LANG_UK_NAME]: LANG_UK_TRANS,

};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary }
];
