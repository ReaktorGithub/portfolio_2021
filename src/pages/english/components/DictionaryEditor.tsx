import React, { useState } from 'react';
import { checkWordExist, createWord, deleteWord } from '../dictionaryController';
import { EVerbForms } from '../enums';
import { WrappedDictionaryEditor } from '../style';
import { IDictionaryEntries, IDictionaryProps } from '../types';
import { getVerbFormRussian } from '../utils';

const initialValues = {
  id: 0,
  regular: '',
  past: '',
  heShe: '',
  wrong: EVerbForms.REGULAR,
}

const DictionaryEditor: React.FC<IDictionaryProps> = (props) => {
  const { dictionary, updateDictionary } = props;

  const [values, setValues] = useState<IDictionaryEntries>(initialValues);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isExist = checkWordExist(dictionary, values.regular);
    if (isExist) {
      setHasError(true);
      return;
    }
    const newDictionary = createWord(dictionary, {
      ...values,
      id: Date.now(),
    });
    updateDictionary(newDictionary);
    setValues(initialValues);
  }

  const setAnyValue = (key: keyof IDictionaryEntries, value: string) => {
    setHasError(false);
    setValues(prev => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    console.log('удаление', id);
    const newDictionary = deleteWord(dictionary, id);
    updateDictionary(newDictionary);
  }

  return(
    <WrappedDictionaryEditor error={hasError}>
      <h2>Dictionary Editor</h2>
      <form onSubmit={handleSubmit}>
        <label>Начальная форма
          <input placeholder="open" value={values.regular} onChange={(e) => setAnyValue('regular', e.target.value)} required/>
        </label>
        <label>Прошедшее время
          <input placeholder="opened" value={values.past} onChange={(e) => setAnyValue('past', e.target.value)} required/>
        </label>
        <label>He, she
          <input placeholder="opens" value={values.heShe} onChange={(e) => setAnyValue('heShe', e.target.value)} required/>
        </label>
        <label>Неправильный?
          <select value={values.wrong} onChange={(e) => setAnyValue('wrong', e.target.value)}>
            <option value={EVerbForms.WRONG}>Да</option>
            <option value={EVerbForms.REGULAR}>Нет</option>
          </select>
        </label>
        <button type='submit'>Добавить в словарь</button>
        <p className="error">в словаре уже есть такое слово</p>
      </form>
      <h3>Словарь</h3>
      <div className="scroll">
        <table className="dictionary">
          <thead>
            <tr>
              <th>Начальная форма</th>
              <th>Прошедшее время</th>
              <th>He, she</th>
              <th>Непр.?</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dictionary).map(item => {
              return <tr key={item[1].id}>
                <td>{item[0]}</td>
                <td>{item[1].past}</td>
                <td>{item[1].heShe}</td>
                <td>{getVerbFormRussian(item[1].wrong)}</td>
                <td><button className="btn-delete" onClick={(e) => handleDelete(e, item[1].id)}>X</button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </WrappedDictionaryEditor>
  )
}

export default DictionaryEditor;