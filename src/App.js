import './App.css';
import React, { useContext, useEffect } from 'react';
import IncomeForm from './Components/Forms/IncomeForm';
import ExpenseForm from './Components/Forms/ExpenseForm';
import IncomeTable from './Components/Table/IncomeTable';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import ExpenseTable from './Components/Table/ExpenseTable';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Tracker from './Components/Cards/Tracker';
import Login from './Components/Authentication/Login';
import { AppContext } from './utils/context';

function App() {
  const [user] = useAuthState(auth);
  const {
    dispatch,
    state: { loading },
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'SET_LOADING', data: false }), 1000);
  }, []);

  const signOut = () => {
    auth.signOut();
    dispatch({
      type: 'SET_EXPENSE_MONEY',
      data: 0,
    });
  };

  console.log(loading);
  if (loading) return <h1>Loading..</h1>;
  return user ? (
    <Box px={6}>
      <button className='auth-button' onClick={signOut}>
        Sign Out
      </button>

      <Tracker />
      <Tabs variant='soft-rounded' colorScheme='green'>
        <Center>
          <TabList>
            <Tab>Income</Tab>
            <Tab>Expense</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel style={{ width: '100%', padding: '0px' }}>
            <IncomeTable />
          </TabPanel>
          <TabPanel>
            <ExpenseTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <IncomeForm />
      <ExpenseForm />
    </Box>
  ) : (
    <Login />
  );
}

export default App;
