import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './StartQuiz.css';

const useStyles = makeStyles({
  violetButton: {
    backgroundColor: 'darkviolet',
    '&:hover': {
      backgroundColor: 'violet',
    },
  },
});

const StartQuiz = ({ quizDetails }) => {
  const classes = useStyles();

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
          <div>Number of questions: {quizDetails.questions_count}</div>
          <div className='Score'>
            Score: <span className='OnCorrect'>{quizDetails.correct_answer_marks}</span> || <span className='OnIncorrect'>-{quizDetails.negative_marks}</span>
          </div>
          <div>Duration: {quizDetails.duration} min</div>
        </div>
      </Typography>
      <Button
        variant="contained"
        onClick={resetScore}
        component={Link}
        to="/quiz"
        className={classes.violetButton}
      >
        Start Quiz
      </Button>
    </Container>
  );
};

export default StartQuiz;
