/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './ChatView.css';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { selectSelectedImage } from './features/appSlice';
import { useNavigate } from 'react-router-dom';

const ChatView = () => {
  const selectedImg = useSelector(selectSelectedImage);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedImg) {
      exit();
    }
  }, [selectedImg]);
  const exit = () => {
    navigate('/');
  };
  return (
    <div className="chatView">
      <img
        src={selectedImg}
        alt=""
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <div className="chatView_timer">
        <CountdownCircleTimer
          isPlaying={true}
          duration={10}
          strokeWidth={6}
          size={50}
          colors={['#004777', '#F7B801', '#A30000']}
          colorsTime={[7, 5, 2]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
