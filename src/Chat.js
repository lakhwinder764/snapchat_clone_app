import React from 'react';
import { Avatar } from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import './Chat.css';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

const Chat = ({ id, username, timestamp, read, imageUrl, profilePic }) => {
  console.info(profilePic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      const data = doc(db, 'posts', id);
      setDoc(data, {
        imageUrl,
        username,
        profilePic,
        read: true,
        timestamp,
      });
      navigate('/chats/view');
    }
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view - '}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat_readIcon" />}
    </div>
  );
};

export default Chat;
