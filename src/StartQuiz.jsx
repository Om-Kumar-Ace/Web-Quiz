// src/StartQuiz.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import './StartQuiz.css';

const StartQuiz = ({ quizDetails }) => {
  if (!quizDetails || !quizDetails.title) {
    return <div>Loading...</div>;
  }

  const resetScore = () => {
    localStorage.setItem('score', 0);
  };

  return (
    <Container className="start-quiz">
      <Typography variant="h2" gutterBottom>
        {quizDetails.title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Topic: {quizDetails.topic}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <div className="details">

       <div className=' Score '>
      Score <span className='OnCorrect'>{quizDetails.correct_answer_marks}</span> || <span className='OnIncorrect'>-{quizDetails.negative_marks}</span>
       </div>
        Duration: {quizDetails.duration} min
        </div>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={resetScore}
        component={Link}
        to="/quiz"
      >
        Start Quiz
      </Button>
    </Container>
  );
};

export default StartQuiz;
