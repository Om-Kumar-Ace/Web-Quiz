import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Summary.css';

const Summary = ({ score, totalQuestions, responses, reset }) => {
  const navigate = useNavigate();

  const handleRetake = () => {
    reset();
    navigate('/');
  };

  return (
    <div className='summary-container'>
      <h1>Quiz Summary</h1>
      <hr />
      <h2>Your Score: {score} / {totalQuestions *4 } </h2>
      <ul className='responce-container'>
        {responses.map((response, i) => (
          <li key={i}>
            <h3>{response.question}</h3>
            <p><strong>Your Answer:</strong> {response.selected}</p>
            {response.isCorrect ? (
              <p className='correct-answer'>Correct!</p>
            ) : (
              <p className='wrong-answer'>
                Wrong! The correct answer is: {response.correct}
              </p>
            )}
            {response.readingMaterial.length > 0 && (
              <div className='reading-material'>
                <h4>Reading Material:</h4>
                <ul>
                  {response.readingMaterial.map((section, index) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleRetake}>Retake Quiz</button>
    </div>
  );
};

export default Summary;
