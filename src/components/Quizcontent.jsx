import React, { useState } from 'react';
import style from '../styles/quiz.module.css';
import figur from '../assets/img/figurquizz.png'; 

const quizQuestions = [
  {
    question: 'Mente Platon, at staten skulle styres af filosofer?',
    correctAnswer: 'ja',
  },
  {
    question: 'Ifølge Platon er mennesket ikke tredelt?',
    correctAnswer: 'nej',
  },
  {
    question: 'Hovedet svarer til fornuften hos mennesket?',
    correctAnswer: 'ja',
  },
  {
    question: 'Platon mente, at alle skulle have samme rolle i staten?',
    correctAnswer: 'nej',
  },
  {
    question: 'Er Platons statsfilosofi præget af rationalisme?',
    correctAnswer: 'ja',
  },
  {
    question: 'Er Platons idealstat baseret på demokrati?',
    correctAnswer: 'nej',
  },
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    const currentQuestion = quizQuestions[currentIndex];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={style.quizContainer}>
      <h2 className={style.title}>Quizzen</h2>
      <h3 className={style.subtitle}>Filosofistaten<br />Af Sofies verden</h3>

      {!showResult ? (
      <>
        <p className={style.question}>
          {quizQuestions[currentIndex].question}
        </p>
        <div className={style.buttonGroup}>
          <button onClick={() => handleAnswer('ja')}>Ja</button>
          <button onClick={() => handleAnswer('nej')}>Nej</button>
        </div>
        <p className={style.progress}>
          Spørgsmål {currentIndex + 1} af {quizQuestions.length}
        </p>
      </>
      ) : (
      <div className={style.result}>
        <h2>Resultat</h2>
        <p>Du fik {score} ud af {quizQuestions.length} rigtige!</p>
        <button className={style.retryButton} onClick={() => {
          setCurrentIndex(0);
          setScore(0);
          setShowResult(false);
          }}>
          Prøv igen
        </button>
        <div className={style.figur}>
          <img src={figur} alt="tegnet figur" />
        </div>
      </div>
      )}
      


    </div>
  );
};

export default Quiz;
