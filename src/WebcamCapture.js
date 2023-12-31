/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css';
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};
const WebcamCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate('/preview');
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints?.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints?.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUnchecked
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};

export default WebcamCapture;
