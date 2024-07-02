import React, { useEffect, useState } from 'react';
import DictionaryEditor from './components/DictionaryEditor';
import EnglishTraining from './components/EnglishTraining';
import { WrappedLayout } from './style';
import { dictionaryStub } from './dictionary';
import { IDictionary } from './types';
import { sortDictionary } from './utils';

const App: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<IDictionary>(dictionaryStub);

  useEffect(() => {
    const saved = localStorage.getItem('dictionary');
    if (saved) {
      console.log('загружен словарь из localStorage');
      setDictionary(JSON.parse(saved));
      return;
    }
    console.log('localStorage пуст, беру стандартный словарь');
    setDictionary(sortDictionary(dictionaryStub));
  }, [])

  const handleEditor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowEditor(prev => !prev);
  }

  const updateDictionary = (dictionary: IDictionary) => {
    setDictionary(sortDictionary(dictionary));
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
    console.log('словарь сохранен в localStorage');
  }

  return(
    <WrappedLayout>
      <div className="cont">
        {
          showEditor ?
            <DictionaryEditor dictionary={dictionary} updateDictionary={updateDictionary}/> :
            <EnglishTraining dictionary={dictionary}/>
        }
        <footer>
          <a href='#' onClick={handleEditor}>{showEditor ? 'закрыть редактор' : 'редактор словаря'}</a>
        </footer>
      </div>
    </WrappedLayout>
  );
}

export default App;
