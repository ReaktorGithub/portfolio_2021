import { replaceTemplate } from "./dictionary";
import { EPronouns, ESentenceTypes, ESentenceTypesRussian, ETimes, ETimesRussian, EVerbForms } from "./enums";
import { IDictionary, IDictionaryCommon, IDictionaryEntries, ITemplateResult } from "./types";
import _ from 'lodash';

/**
 * Извлекает случайный элемент массива
 * @param arr 
 * @returns 
 */

export const getRandomFromArray = <T>(arr: T[]): T => {
  const num = _.random(0, arr.length - 1);
  return arr[num];
}

/**
 * Создает массив из 9 чисел (0-8) и перемешивает их
 * @returns {number[]}
 */

export const getSequence = (): number[] => {
  const arr = _.range(9);
  return _.shuffle(arr);
}

/**
 * Генерирует объект шаблона ответа
 * @param dictionary 
 * @param sequence 
 * @param word 
 * @returns {ITemplateResult}
 */

export const getTemplate = (dictionary: IDictionary, sequence: number, word: string): ITemplateResult => {
  const pronoun = getRandomFromArray(Object.values(EPronouns));
  const wordPast = dictionary[word]?.past || word;
  const wordHeShe = dictionary[word]?.heShe || word;
  const isHeShe = pronoun === EPronouns.HE || pronoun === EPronouns.SHE ? true : false;

  console.log({pronoun, isHeShe});

  let result: ITemplateResult;

  switch (sequence) {
    case 0: {
      result = {
        sentenceType: ESentenceTypes.QUESTION,
        time: ETimes.FUTURE,
        str: `Will ${pronoun} ${word}?`,
        pronoun,
      }
      break;
    }
    case 1: {
      result = {
        sentenceType: ESentenceTypes.QUESTION,
        time: ETimes.PRESENT,
        str: `${isHeShe ? "Does" : "Do"} ${pronoun} ${word}?`,
        pronoun,
      }
      break;
    }
    case 2: {
      result = {
        sentenceType: ESentenceTypes.QUESTION,
        time: ETimes.PAST,
        str: `Did ${pronoun} ${word}?`,
        pronoun,
      }
      break;
    }
    case 3: {
      result = {
        sentenceType: ESentenceTypes.STATEMENT,
        time: ETimes.FUTURE,
        str: `${pronoun} will ${word}`,
        pronoun,
      }
      break;
    }
    case 4: {
      result = {
        sentenceType: ESentenceTypes.STATEMENT,
        time: ETimes.PRESENT,
        str: `${pronoun} ${isHeShe ? wordHeShe : word}`,
        pronoun,
      }
      break;
    }
    case 5: {
      result = {
        sentenceType: ESentenceTypes.STATEMENT,
        time: ETimes.PAST,
        str: `${pronoun} ${wordPast}`,
        pronoun,
      }
      break;
    }
    case 6: {
      result = {
        sentenceType: ESentenceTypes.NEGATION,
        time: ETimes.FUTURE,
        str: `${pronoun} will not ${word}`,
        pronoun,
      }
      break;
    }
    case 7: {
      result = {
        sentenceType: ESentenceTypes.NEGATION,
        time: ETimes.PRESENT,
        str: `${pronoun} ${isHeShe ? "doesn't" : "don't"} ${word}`,
        pronoun,
      }
      break;
    }
    default: {
      result = {
        sentenceType: ESentenceTypes.NEGATION,
        time: ETimes.PAST,
        str: `${pronoun} didn't ${word}`,
        pronoun,
      }
      break;
    }
  }

  return {
    ...result,
    str: result.str[0].toUpperCase() + result.str.substring(1),
  }
}

/**
 * Переводит на русский тип задания
 * @param type
 * @returns {ETimesRussian | ESentenceTypesRussian}
 */

export const getTranslate = (type: ETimes | ESentenceTypes): ETimesRussian | ESentenceTypesRussian => {
  switch (type) {
    case ETimes.PRESENT:
      return ETimesRussian.PRESENT;
    case ETimes.FUTURE:
      return ETimesRussian.FUTURE;
    case ETimes.PAST:
      return ETimesRussian.PAST;
    case ESentenceTypes.QUESTION:
      return ESentenceTypesRussian.QUESTION;
    case ESentenceTypes.NEGATION:
      return ESentenceTypesRussian.NEGATION;
    default:
      return ESentenceTypesRussian.STATEMENT;
  }
}

/**
 * Зачищает ответ от вариаций типа do not => don't
 * @param str
 * @returns {String}
 */

export const replaceShortcuts = (str: string): string => {
  let result = str;
  replaceTemplate.forEach(item => {
    result = result.replace(item[0], item[1]);
  });
  return result;
}

// работа со словарем

/**
 * Переводит на русский обозначение формы глагола (обычная, неправильная) для тега options
 * @param form 
 * @returns {String}
 */

export const getVerbFormRussian = (form: EVerbForms): string => {
  switch (form) {
    case EVerbForms.REGULAR: {
      return 'нет';
    }
    default: {
      return 'да';
    }
  }
}

/**
 * Сортировка словаря по словам основной формы, возвращает словарь
 * @param dictionary 
 * @returns {IDictionary}
 */

export const sortDictionary = (dictionary: IDictionary): IDictionary => {
  const sortKeys = Object.keys(dictionary).sort();
  const result: IDictionary = {};
  sortKeys.forEach(item => {
    result[item] = dictionary[item];
  });
  console.log('сортировка словаря завершена', result);
  return result;
}
