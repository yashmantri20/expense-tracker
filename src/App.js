import './App.css';
import React, { useContext, useEffect } from 'react';

import { Box, Center, Image, Flex, Text, Button } from '@chakra-ui/react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from './assets/logo.png';
import Tracker from './Components/Cards/Tracker';
import Login from './Components/Authentication/Login';
import { AppContext } from './utils/context';
import Tabs from './Components/Tabs/Tabs';

function App() {
  const [user] = useAuthState(auth);
  const {
    dispatch,
    state: { loading },
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'SET_LOADING', data: false }), 3000);
  }, []);

  const signOut = () => {
    auth.signOut();
    dispatch({
      type: 'SET_ALL',
    });
  };

  if (loading) return <h1>Loading..</h1>;

  return user ? (
    <Box px={4} className='dashboard'>
      <Center>
        <Flex width='95%' mt={4}>
          <Image src={logo} width='40px' height='40px' />
          <Text my='auto' fontSize={20} pl={2}>
            Expense Tracker
          </Text>
          <Button onClick={signOut} style={{ marginLeft: 'auto' }}>
            Sign Out
          </Button>
        </Flex>
      </Center>
      <Tracker />
      <Tabs />
    </Box>
  ) : (
    <Login />
  );
}

export default App;
