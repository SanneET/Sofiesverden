import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import style from '../styles/tekstcontent.module.css'; // CSS module import
import figurfinish from '../assets/img/figurquizz.png'; // Import your image here

const TextSlider = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); 

  const handleNext = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={style.sliderContainer}>
      <div className={style.textSection}>
        <p>{texts[currentIndex]}</p>
      </div>

      <p className={style.pageIndicator}>
        Side {currentIndex + 1} ud af {texts.length}
      </p>

      <div className={style.buttonGroup}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`${style.sliderButton} ${style.navyBlue}`}
        >
          Tilbage
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === texts.length - 1}
          className={`${style.sliderButton} ${style.navyBlue}`}
        >
          Næste side
        </button>
      </div>

      {currentIndex === texts.length - 1 && (
        <>
          <div className={style.figur}>
            <img src={figurfinish} alt="tegnet figur" />
          </div>
          <button
            className={`${style.quizButton} ${style.greenButton}`}
            onClick={() => navigate('/quiz')}
          >
            Gå til quiz
          </button>
      </>
        
      )}
    </div>
  );
};

export default TextSlider;