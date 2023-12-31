import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { provider, auth } from './firebase';
import { login } from './features/appSlice';

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.info(result);
      dispatch(
        login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid,
        })
      );
    });
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
