import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCameraImage, selectcameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import NotesIcon from '@mui/icons-material/Notes';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { db, storage } from './firebase';
import './preview.css';
import { selectUser } from './features/appSlice';

const Preview = () => {
  const cameraImg = useSelector(selectcameraImage);
  console.info(cameraImg);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImg) {
      navigate('/');
    }
  }, [cameraImg, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate('/');
  };

  const sendPost = () => {
    const id = uuid();
    console.info(serverTimestamp());
    const storageRef = ref(storage, `posts/${id}`);
    uploadString(storageRef, cameraImg, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const data = doc(db, 'posts', id);
        setDoc(data, {
          imageUrl: url,
          username: user?.username,
          read: false,
          profilePic: user?.profilePic,
          timestamp: new Date(),
        });
        navigate('/');
      });
    });
  };

  return (
    <div className="preview">
      <CloseIcon className="preview_close" onClick={closePreview} />
      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NotesIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon
          onClick={() =>
            navigate('/crop', {
              state: { link: cameraImg },
            })
          }
        />
        <TimerIcon />
      </div>
      <img
        src={cameraImg}
        alt=""
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      />
      <div className="preview_footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview_sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
