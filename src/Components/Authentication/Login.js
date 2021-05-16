import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import { auth } from '../../firebase';
import { useToast } from '@chakra-ui/toast';
import { AppContext } from '../../utils/context';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AppContext);
  const toast = useToast();
  const [toggle, setToggle] = useState(true);

  const signInWithGoogle = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signIn = () => {
    dispatch({ type: 'SET_LOADING', data: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) =>
        toast({
          title: 'Welcome Back',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      )
      .catch((e) =>
        toast({
          title: e.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      );
  };

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) =>
        toast({
          title: 'Welcome',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      )
      .catch((e) =>
        toast({
          title: e.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      );
  };

  const resetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: 'Please Check your mail',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setToggle(true);
      })
      .catch((e) =>
        toast({
          title: e.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      );
  };

  return toggle ? (
    <SignIn
      setEmail={setEmail}
      setPassword={setPassword}
      setToggle={setToggle}
      signInWithGoogle={signInWithGoogle}
      signIn={signIn}
      signUp={signUp}
    />
  ) : (
    <ResetPassword
      setEmail={setEmail}
      setToggle={setToggle}
      resetPassword={resetPassword}
    />
  );
};


export default Login;
