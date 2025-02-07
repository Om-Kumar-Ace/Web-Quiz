import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import Summary from './Summary';

const Quiz = ({ questions, duration }) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [responses, setResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const optionRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuestion(questions[index]);
    }
  }, [index, questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkAns = (e, ansIndex) => {
    if (!lock && question && question.options && question.options.length > 0) {
      setSelectedOption(ansIndex);
      let isCorrect = false;
      if (question.options[ansIndex].is_correct) {
        e.target.classList.add("correct");
        setScore(prev => prev + 4);
        isCorrect = true;
      } else {
        e.target.classList.add("wrong");
        setScore(prev => prev -1);
        if (optionRefs.current.find(ref => ref.current && question.options[ref.current.dataset.index].is_correct)) {
          optionRefs.current.find(ref => ref.current && question.options[ref.current.dataset.index].is_correct).current.classList.add("correct");
        }
      }
      const newResponses = [
        ...responses,
        {
          question: question.description,
          question_id: question.id,
          selected: question.options[ansIndex].description,
          isCorrect,
          correct: question.options.find(option => option.is_correct).description,
          readingMaterial: question.reading_material ? question.reading_material.content_sections : []
        }
      ];
      setResponses(newResponses);
      setLock(true);

      setTimeout(() => {
        setLock(false);
        setSelectedOption(null);
        next();
      }, 4000);
    }
  };

  const next = () => {
    if (lock) {
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        setResult(true);
      }
      optionRefs.current.forEach(ref => {
        if (ref.current) {
          ref.current.classList.remove("wrong");
          ref.current.classList.remove("correct");
        }
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(questions[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    setTimeLeft(duration * 60);
    setResponses([]);
  };

  if (result) {
    return <Summary score={score} totalQuestions={questions.length} responses={responses} reset={reset} />;
  }

  return (
    <div className='container'>
      <h1>Web-Quiz</h1>
      <hr />
      <div className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      {question && <h2>{index + 1}. {question.description}</h2>}
      <ul>
        {question.options && question.options.map((option, i) => (
          <li 
            key={i} 
            ref={optionRefs.current[i]} 
            data-index={i} 
            onClick={(e) => checkAns(e, i)} 
            className={selectedOption === i ? 'selected' : ''}
          >
            {option.description}
          </li>
        ))}
      </ul>
      <button onClick={next} disabled={!lock}>Next</button>
      <div className='index'>
        {index + 1} of {questions.length} Questions
      </div>
    </div>
  );
};

export default Quiz;
