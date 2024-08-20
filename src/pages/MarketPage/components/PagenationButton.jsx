import React from 'react';
import arrowLeft from '../../../api/assets/images/icons/arrow_left.png';
import arrowRight from '../../../api/assets/images/icons/arrow_right.png';
import './PagenationButton.css';

export const PagenationButton = () => {
  return (
    <div className="Pagenation-wrap">
      <div className="Circle">
        <img src={arrowLeft} alt="arrow_left" />
      </div>
      <div className="Circle">1</div>
      <div className="Circle">2</div>
      <div className="Circle">3</div>
      <div className="Circle">4</div>
      <div className="Circle">5</div>
      <div className="Circle">
        <img src={arrowRight} alt="arrow_right" />
      </div>
    </div>
  );
};
