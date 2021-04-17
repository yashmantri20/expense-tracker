import { SimpleGrid } from '@chakra-ui/layout';
import React, { useContext, useEffect } from 'react';
import { auth, firestore } from '../../firebase';
import { AppContext } from '../../utils/context';
import { getMonth, getPrevMonth } from '../../utils/getMonth';
import ExpenseForm from '../Forms/ExpenseForm';
import IncomeForm from '../Forms/IncomeForm';
import Card from './Card';
import PrevMonthCard from './PrevMonthCard';
import './Card.css';

const Tracker = () => {
  let size;

  let widthscreen = window.innerWidth;
  if (widthscreen >= 768 && widthscreen <= 1200) {
    size = 2;
  } else {
    size = 4;
  }

  const {
    dispatch,
    state: {
      expenseMoney,
      incomeMoney,
      remainingMoney,
      prevMonthExpense,
      prevMonthIncome,
      incomePercentage,
      expensePercentage,
    },
  } = useContext(AppContext);

  useEffect(() => {
    const month = getMonth();
    const prevMonth = getPrevMonth();

    firestore
      .collection(`expense/${auth.currentUser.uid}/${month}`)
      .doc('Total')
      .get()
      .then((d) =>
        dispatch({
          type: 'SET_EXPENSE_MONEY',
          data: d.data()?.totalmoney || 0,
        })
      );

    firestore
      .collection(`expense/${auth.currentUser.uid}/${prevMonth}`)
      .doc('Total')
      .get()
      .then((d) => {
        dispatch({
          type: 'SET_PREV_EXPENSE_MONEY',
          data: d.data()?.totalmoney || 0,
        });
        dispatch({ type: 'SET_PERCENTAGE_EXPENSE' });
      });

    firestore
      .collection(`income/${auth.currentUser.uid}/${month}`)
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
      .collection(`income/${auth.currentUser.uid}/${prevMonth}`)
      .doc('Total')
      .get()
      .then((d) => {
        dispatch({
          type: 'SET_PREV_INCOME_MONEY',
          data: d.data()?.totalmoney || 0,
        });
        dispatch({ type: 'SET_PERCENTAGE_INCOME' });
        dispatch({ type: 'SET_LOADING', data: false });
      });
  }, []);

  return (
    <SimpleGrid
      columns={[1, 1, 2, size]}
      spacingX={[4, 4, 6, 8]}
      mt={12}
      spacingY={[8, 10, 12, 12]}
    >
      <Card
        amount={incomeMoney}
        title='Total Income'
        form={<IncomeForm />}
        inc={incomePercentage * 100}
        color={incomePercentage < 0 ? 'red' : 'green'}
      />
      <Card
        amount={expenseMoney}
        title='Total Expense'
        form={<ExpenseForm />}
        inc={expensePercentage * 100}
        color={expensePercentage > 0 ? 'red' : 'green'}
      />
      <Card amount={remainingMoney} title='Remaining Balance' />
      <PrevMonthCard
        expense={prevMonthExpense}
        income={prevMonthIncome}
        title='Previous Month Data'
      />
    </SimpleGrid>
  );
};

export default Tracker;
