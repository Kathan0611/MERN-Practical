import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Operation = () => {
  const [page, setPage] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (page === 'game') {
      const generatedQuestions = generateQuestions();
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0); 
      setTimer(30);
      startTimer(); 
    }
  }, [page]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleTimeUp(); 
        }
        return prev - 1;
      });
    }, 1000);
  };

  const generateQuestions = () => {
    return Array.from({ length: 10 }, () => {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const operator = ['+', '-', 'x', '/'][Math.floor(Math.random() * 4)];
      const correctAnswer = calculateAnswer(num1, num2, operator);
      const answers = [correctAnswer, ...generateWrongAnswers(correctAnswer)].sort(() => Math.random() - 0.5);
      return { num1, num2, operator, correctAnswer, answers };
    });
  };

  const calculateAnswer = (num1, num2, operator) => {
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case 'x': return num1 * num2;
      case '/': return num2 !== 0 ? num1 / num2 : 0;
      default: return 0;
    }
  };

  const generateWrongAnswers = (correctAnswer) => {
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const rand = Math.floor(Math.random() * 20);
      if (rand !== correctAnswer && !wrongAnswers.includes(rand)) {
        wrongAnswers.push(rand);
      }
    }
    return wrongAnswers;
  };

  const handleAnswer = (isCorrect) => {
    
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([
      ...userAnswers,
      { question: `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`, result: isCorrect ? 'Correct' : 'Incorrect' }
    ]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); 
    } else {
      setIsGameOver(true); 
      setPage('result');
    }
  };

  const handleTimeUp = () => {
    // Handle time up case, move to next question automatically
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([
      ...userAnswers,
      { question: `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`, result: 'Time Up' }
    ]);

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset timer for next question
    } else {
      setIsGameOver(true); // End game after the last question
      setPage('result');
    }
  };

  const handleStart = () => setPage('game');
  const handleRestart = () => {
    navigate('/')
    setScore(0);
    setUserAnswers([]);
    setIsGameOver(false);
    setTimer(30);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      {page === 'home' && (
        <div>
          <h1>Math Game</h1>
          <button onClick={handleStart}>Start Game</button>
        </div>
      )}

      {page === 'game' && currentQuestion && (
        <div>
          <h2>{currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2}</h2>
          <div>
            {currentQuestion.answers.map((answer, idx) => (
              <button key={idx} onClick={() => handleAnswer(answer === currentQuestion.correctAnswer)}>
                {answer}
              </button>
            ))}
          </div>
          <div>Time: {timer}s</div>
        </div>
      )}

      {page === 'result' && (
        <div>
          <h2>Game Over!</h2>
          <p>Your Score: {score}/10</p>
          <ul>
            {userAnswers.map((ans, idx) => (
              <li key={idx}>
                {ans.question} - {ans.result}
              </li>
            ))}
          </ul>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto"onClick={handleRestart}>Redirect</button>
        </div>
      )}
    </div>
  );
};

export default Operation;

