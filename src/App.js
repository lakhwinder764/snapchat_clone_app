/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preview from './Preview';
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import New from './New';

function App() {
  const user = useSelector(selectUser);
  console.info(user?.username);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <img
            className="app_logo"
            src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
            alt=""
          />
          <div className="app_body">
            <div className="app_bodyBackground">
              <BrowserRouter>
                <Routes>
                  <Route path="/snap" element={<WebcamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/" element={<Chats />} />
                  <Route path="/crop" element={<New />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
