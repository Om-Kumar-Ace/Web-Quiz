const axios = require('axios');
const fs = require('fs');
const { stringify } = require('flatted');

const fetchQuizData = async () => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    const quizData = response.data;

    // Save the data to a local JSON file using flatted.stringify
    fs.writeFileSync('quiz.json', stringify(quizData, null,4));

    console.log('Quiz data fetched and saved to quiz.json');
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
};

fetchQuizData();
