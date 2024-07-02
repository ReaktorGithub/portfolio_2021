import { IDictionary, IDictionaryCommon, IDictionaryEntries } from "./types";

/**
 * Добавляет новую запись в словарь и возвращает словарь
 * @param dictionary 
 * @param word 
 * @returns {IDictionary}
 */

export const createWord = (dictionary: IDictionary, word: IDictionaryEntries): IDictionary => {
  const newWord: IDictionaryCommon = {
    id: word.id,
    past: word.past,
    heShe: word.heShe,
    wrong: word.wrong,
  }
  return {
    ...dictionary,
    [word.regular]: newWord,
  }
}

/**
 * Проверяет, есть ли уже такое слово в словаре
 * @param dictionary 
 * @param id 
 * @returns {Boolean}
 */

export const checkWordExist = (dictionary: IDictionary, word: string): boolean => {
  for (let item in dictionary) {
    if (item === word) {
      return true;
    }
  }
  return false;
}

/**
 * Удаляет слово из словаря и возвращает словарь
 * @param dictionary 
 * @param id 
 * @returns {IDictionary}
 */

export const deleteWord = (dictionary: IDictionary, id: number): IDictionary => {
  const newDictionary: IDictionary = {};
  for (let item in dictionary) {
    if (dictionary[item].id !== id) {
      newDictionary[item] = dictionary[item];
    }
  }
  return newDictionary;
}
