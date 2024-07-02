import React, { useEffect, useMemo, useState } from 'react';
import { EPronouns, EResult, ESentenceTypes, ETimes, EVerbForms } from '../enums';
import { WrappedEnglishTraining } from '../style';
import { ICommonProps, ITemplateResult } from '../types';
import { getSequence, getTemplate, getTranslate, replaceShortcuts } from '../utils';
import hint from '../img/hint.png';

const templateInitial = {
  sentenceType: ESentenceTypes.QUESTION,
  time: ETimes.FUTURE,
  str: '',
  pronoun: EPronouns.I,
}

const EnglishTraining: React.FC<ICommonProps> = (props) => {
  const { dictionary } = props;
  const dictionaryMap = useMemo(() => Object.entries(dictionary), [dictionary]);

  const [word, setWord] = useState<string | 'none'>('none');
  const [isProcess, setIsProcess] = useState<boolean>(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTemplate, setCurrentTemplate] = useState<ITemplateResult>(templateInitial);
  const [value, setValue] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [result, setResult] = useState<EResult>(EResult.NONE);
  const [count, setCount] = useState<number>(0);
  const [over, setOver] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  useEffect(() => {
    if (isProcess) {
      const seq = getSequence();
      console.log('генерация последовательности: ', seq);
      setResult(EResult.NONE);
      setCount(0);
      setSequence(seq);
      setShowResult(false);
      setValue('');
      setOver(false);
      setCurrentIndex(0);
      const template = getTemplate(dictionary, seq[0], word);
      setCurrentTemplate(template);
    }
  }, [isProcess])

  useEffect(() => {
    if (currentIndex) {
      const template = getTemplate(dictionary, sequence[currentIndex], word);
      setCurrentTemplate(template);
      setResult(EResult.NONE);
    }
  }, [currentIndex])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasError(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let answer = value.trim().toLowerCase();
    if (!answer) {
      setHasError(true);
      return;
    }
    // проверка ответа
    answer = replaceShortcuts(answer);
    if (currentTemplate.sentenceType === ESentenceTypes.QUESTION && answer.indexOf('?') === -1) {
      answer += '?';
    }
    const template = currentTemplate.str.toLowerCase();
    if (template === answer) {
      setResult(EResult.CORRECT);
      setCount(prev => prev + 1);
    } else {
      setResult(EResult.WRONG);
    }
    if (sequence[currentIndex + 1] === undefined) {
      setOver(true);
    }
  }

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentIndex(prev => prev + 1);
    setValue('');
  }

  const handleOver = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowResult(true);
  }

  const handleHint = () => {
    setShowHint(prev => !prev);
  }

  return(
    <WrappedEnglishTraining error={hasError}>

      <h2>English Training</h2>

      <span className="word-for-training">Глагол для тренировки:</span>

      {
        isProcess ? 
          <>
            <span className="word-selected">{word.toUpperCase()}</span>
            <button className="btn-stop" onClick={() => setIsProcess(false)}>Stop training</button>
            {
              !showResult ?
              <>
                <h3>Вопрос { currentIndex + 1} из { sequence.length }</h3>
                <p>Постройте <span className="task">{ getTranslate(currentTemplate.sentenceType) }</span> + <span className="task">{ getTranslate(currentTemplate.time) }</span> с местоимением <span className="task">{ currentTemplate.pronoun }</span></p>
                <form className="input-form" onSubmit={ !over ? (result === EResult.NONE ? handleSubmit : handleNext) : handleOver }>
                  <div>
                    <input value={value} onChange={handleChange}/>
                    <p className="input-error">введите ответ</p>
                  </div>
                  <button className="btn-check" type="submit">{ !over ? (result === EResult.NONE ? 'Check' : 'Next') : 'Over' }</button>
                </form>
                <div className="show-answer">
                  {
                    result !== EResult.NONE && result === EResult.CORRECT ?
                      <p className="result result--true">ВЕРНО!</p> :
                        result !== EResult.NONE &&
                        <>
                          <p className="result result--false">НЕВЕРНО!</p>
                          <p className="result">Правильный ответ: <span className="result--right">{currentTemplate.str}</span></p>
                        </>
                  }
                </div>
                <p>Счёт: {count}</p>
              </> :
                <>
                  <h3>Итоги</h3>
                  <p>Правильных ответов: {count}</p>
                  <p>Неправильных ответов: {sequence.length - count}</p>
                </>
            }
          </> :
          <select onChange={(e) => setWord(e.target.value)} value={word}>
            <option value="none">Не выбрано</option>
            <optgroup label="правильные глаголы">
              {dictionaryMap.map(item => {
                if (item[1].wrong === EVerbForms.REGULAR) {
                  return <option key={item[1].id} value={item[0]}>{item[0]}</option>
                }
              })}
            </optgroup>
            <optgroup label="неправильные глаголы">
              {dictionaryMap.map(item => {
                if (item[1].wrong === EVerbForms.WRONG) {
                  return <option key={item[1].id} value={item[0]}>{item[0]}</option>
                }
              })}
            </optgroup>
          </select>
      }

      {
        word !== 'none' && !isProcess &&
        <button className="btn-start" onClick={() => setIsProcess(true)}>Start training</button>
      }

      <button onClick={handleHint} className="btn-hint">{ showHint ? 'Скрыть' : 'Показать'} шпаргалку</button>

      {
        showHint &&
        <picture className="img-hint">
          <img src={hint}/>
        </picture>
      }

    </WrappedEnglishTraining>
  );
}

export default EnglishTraining;
