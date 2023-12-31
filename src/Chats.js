import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './Chats.css';
import { db } from './firebase.js';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { selectUser } from './features/appSlice';
import { signOut } from 'firebase/auth';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.info(posts);
  useEffect(() => {
    const fun = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
      );
      setPosts(
        querySnapshot?.docs?.map((doc) => ({
          id: doc.id,
          data: doc?.data(),
        }))
      );
    };
    fun();
  }, []);

  const takesnap = () => {
    dispatch(resetCameraImage());
    navigate('/snap');
  };
  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          className="chats_avatar"
          src={user.profilePic}
          onClick={() => signOut(auth)}
          sx={{
            cursor: 'pointer',
          }}
        />
        <div className="chats_search">
          <SearchIcon />
          <input
            placeholder="Search Friends"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ChatBubbleIcon
          className="chats_chatIcon"
          sx={{
            fontSize: '1.4rem',
          }}
        />
      </div>
      <div className="chat_posts">
        {posts
          ?.filter((item) =>
            search ? item?.data?.username?.includes(search) : item
          )
          .map((item) => (
            <Chat
              key={item?.id}
              id={item?.id}
              username={item?.data?.username}
              timestamp={item?.data?.timestamp}
              imageUrl={item?.data?.imageUrl}
              read={item?.data?.read}
              profilePic={item?.data?.profilePic}
            />
          ))}
      </div>
      <RadioButtonUncheckedIcon
        className="chats_takePicIcon"
        onClick={takesnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
