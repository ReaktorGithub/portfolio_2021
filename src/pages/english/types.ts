import { EPronouns, ESentenceTypes, ETimes, EVerbForms } from "./enums";

export interface IDictionaryCommon {
  id: number;
  past: string;
  heShe: string;
  wrong: EVerbForms;
}

export interface IDictionaryEntries extends IDictionaryCommon {
  regular: string;
}

export interface IDictionary {
  [key: string]: IDictionaryCommon;
}

export interface ITemplateResult {
  sentenceType: ESentenceTypes;
  time: ETimes;
  str: string;
  pronoun: EPronouns;
}

export interface ICommonProps {
  dictionary: IDictionary;
}

export interface IDictionaryProps extends ICommonProps {
  updateDictionary: (dictionary: IDictionary) => void;
}