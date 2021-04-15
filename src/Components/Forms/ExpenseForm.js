import React, { useContext, useRef, useState } from 'react';
import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { firestore } from '../../firebase';
import DrawerComponent from './DrawerComponent';
import { getMonth } from '../../utils/getMonth';
import { expenseType } from '../../utils/categories';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AppContext } from '../../utils/context';

const ExpenseForm = () => {
  const month = getMonth();

  const [expenseCategory, setExpenseCategory] = useState('salary');
  const [amount, setAmount] = useState(0);
  // const [money, setMoney] = useState(0);

  const [description, setDescription] = useState('');
  const firstField = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    dispatch,
    state: { expenseMoney },
  } = useContext(AppContext);

  const expenseRef = firestore.collection(`expense/1/${month}`);

  const r = firestore.collection(`expense/1/${month}`).doc('Total');

  const submitHandler = () => {
    expenseRef.add({
      category: expenseCategory,
      amount: amount,
      description: description,
      date: new Date().toLocaleDateString('en-US'),
    });

    r.set(
      {
        totalmoney: parseInt(expenseMoney) + parseInt(amount),
      },
      { merge: true }
    );

    dispatch({
      type: 'SET_EXPENSE_MONEY',
      data: parseInt(expenseMoney) + parseInt(amount),
    });

    dispatch({
      type: 'SET_REMAINING_MONEY',
    });

    toast({
      title: 'Expense Added',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <div className='App'>
      <Button colorScheme='teal' onClick={onOpen}>
        Add Expense
      </Button>

      <DrawerComponent
        onClose={onClose}
        isOpen={isOpen}
        setAmount={setAmount}
        setDescription={setDescription}
        setCategory={setExpenseCategory}
        submitHandler={submitHandler}
        firstField={firstField}
        type={expenseType}
      />
    </div>
  );
};

export default ExpenseForm;
