// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import StartQuiz from "./StartQuiz";
import Quiz from "./Quiz";
import quizData from './quiz.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import Summary from "./Summary";

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API, using local data:', error);
    return quizData;
  }
};

const theme = createTheme();

const App = () => {
  const [quizDetails, setQuizDetails] = useState({});

  useEffect(() => {
    const getQuizDetails = async () => {
      const data = await fetchData();
      setQuizDetails(data);
    };
    getQuizDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
        <Routes>
          <Route path="/" element={<StartQuiz quizDetails={quizDetails} />} />
          <Route path="/quiz" element={<Quiz questions={quizDetails.questions} duration={quizDetails.duration} />} />
          <Route path="/summary" element={<Summary/>} />
        </Routes>
      
    </ThemeProvider>
  );
};

export default App;
