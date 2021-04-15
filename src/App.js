import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import IncomeForm from './Components/Forms/IncomeForm';
import ExpenseForm from './Components/Forms/ExpenseForm';
import IncomeTable from './Components/Table/IncomeTable';
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import ExpenseTable from './Components/Table/ExpenseTable';
import { firestore } from './firebase';
import { getMonth, getPrevMonth } from './utils/getMonth';
import { AppContext } from './utils/context';

function App() {
  const {
    dispatch,
    state: {
      expenseMoney,
      incomeMoney,
      remainingMoney,
      prevMonthExpense,
      prevMonthIncome,
    },
  } = useContext(AppContext);

  useEffect(() => {
    const month = getMonth();
    const prevMonth = getPrevMonth();
    firestore
      .collection(`expense/1/${month}`)
      .doc('Total')
      .get()
      .then((d) =>
        dispatch({
          type: 'SET_EXPENSE_MONEY',
          data: d.data()?.totalmoney || 0,
        })
      );

    firestore
      .collection(`expense/1/${prevMonth}`)
      .doc('Total')
      .get()
      .then((d) =>
        dispatch({
          type: 'SET_PREV_EXPENSE_MONEY',
          data: d.data()?.totalmoney || 0,
        })
      );

    firestore
      .collection(`income/1/${month}`)
      .doc('Total')
      .get()
      .then((d) => {
        dispatch({
          type: 'SET_INCOME_MONEY',
          data: d.data()?.totalmoney || 0,
        });
        dispatch({ type: 'SET_REMAINING_MONEY' });
      });

    firestore
      .collection(`income/1/${prevMonth}`)
      .doc('Total')
      .get()
      .then((d) => {
        dispatch({
          type: 'SET_PREV_INCOME_MONEY',
          data: d.data()?.totalmoney || 0,
        });
      });
  }, []);

  // let profit =
  //   (parseInt(incomeMoney) - parseInt(prevMonthIncome)) /
  //   parseInt(prevMonthIncome);
  // console.log(parseInt(profit * 100));
  return (
    <Box px={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacingX={12}>
        <Box m='auto' width='240px' height='110px' p={6} boxShadow='xl'>
          <Flex d='flex' justifyContent='space-between'>
            <Box>
              <Text fontSize='lg' fontWeight={700}>
                Income
              </Text>
              <Text fontSize={24} fontWeight={700}>
                ₹ {incomeMoney}
              </Text>
            </Box>
            <Box my='auto'>
              <IncomeForm />
            </Box>
          </Flex>
        </Box>
        <Box m='auto' width='240px' height='110px' p={6} boxShadow='xl'>
          <Flex d='flex' justifyContent='space-between'>
            <Box>
              <Text fontSize='lg' fontWeight={700}>
                Expense
              </Text>
              <Text fontSize={24} fontWeight={700}>
                ₹ {expenseMoney}
              </Text>
            </Box>
            <Box my='auto'>
              <IncomeForm />
            </Box>
          </Flex>
        </Box>

        <Box m='auto' width='240px' height='110px' p={6} boxShadow='xl'>
          <Flex d='flex' justifyContent='space-between'>
            <Box>
              <Text fontSize='lg' fontWeight={700}>
                Remaining
              </Text>
              <Text fontSize={24} fontWeight={700}>
                ₹ {remainingMoney}
              </Text>
            </Box>
            <Box my='auto'>
              <IncomeForm />
            </Box>
          </Flex>
        </Box>

        <Box m='auto' width='240px' height='110px' p={6} boxShadow='xl'>
          <Flex d='flex' justifyContent='space-between'>
            <Box>
              <Text fontSize='lg' fontWeight={700}>
                Income
              </Text>
              <Text fontSize={24} fontWeight={700}>
                ₹ 5000
              </Text>
            </Box>
            <Box my='auto'>
              <IncomeForm />
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
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
  );
}

export default App;
