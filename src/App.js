import './App.css';
import React, { useContext } from 'react';
import { Box, Center, Image, Flex, Text, Button } from '@chakra-ui/react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from './assets/logo.png';
import Tracker from './Components/Cards/Tracker';
import Login from './Components/Authentication/Login';
import { AppContext } from './utils/context';
import TabDashboard from './Components/TabPanel/TabDashboard';
import Loader from './Components/Loader/Loader';
import GithubRibbon from './utils/GithubRibbon';

function App() {
  const [user, loading] = useAuthState(auth);
  const {
    dispatch,
  } = useContext(AppContext);

  const signOut = () => {
    auth.signOut();
    dispatch({ type: 'SET_ALL' });
  };

  if (loading) return <Loader />;

  return <>
    <GithubRibbon />
    {user ? (
      <Box px={4} className='dashboard'>
        <Center>
          <Flex width='95%' mt={4}>
            <Image src={logo} className='logo' />
            <Text className='heading'>Expense Tracker</Text>
            <Button onClick={signOut} className='signout-btn'>
              Sign Out
          </Button>
          </Flex>
        </Center>
        <Tracker />
        <TabDashboard />
      </Box>
    ) : (
      <Login />
    )}
  </>
}

export default App;
