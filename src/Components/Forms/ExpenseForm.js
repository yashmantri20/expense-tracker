import React, { useContext, useRef, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { auth, firestore } from '../../firebase';
import DrawerComponent from './DrawerComponent';
import { getMonth } from '../../utils/getMonth';
import { expenseType } from '../../utils/categories';
import { AppContext } from '../../utils/context';
import { MdAddCircle } from 'react-icons/md';

const ExpenseForm = () => {
  const month = getMonth();

  const [expenseCategory, setExpenseCategory] = useState();
  const [amount, setAmount] = useState();

  const [description, setDescription] = useState();
  const firstField = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    dispatch,
    state: { expenseMoney },
  } = useContext(AppContext);

  const expenseRef = firestore.collection(
    `expense/${auth.currentUser.uid}/${month}`
  );

  const r = firestore
    .collection(`expense/${auth.currentUser.uid}/${month}`)
    .doc('Total');

  const submitHandler = () => {
    if (expenseCategory && amount >= 0 && description) {
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

      dispatch({ type: 'SET_PERCENTAGE_EXPENSE' });

      toast({
        title: 'Expense Added',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      console.log(expenseCategory, amount, description);

      setDescription();
      setAmount();
      setExpenseCategory();
      onClose();
    } else {
      toast({
        title: 'Please Enter The Valid Data',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='App'>
      <MdAddCircle size='45px' onClick={onOpen} cursor='pointer' />
      <DrawerComponent
        onClose={onClose}
        isOpen={isOpen}
        setAmount={setAmount}
        setDescription={setDescription}
        setCategory={setExpenseCategory}
        submitHandler={submitHandler}
        firstField={firstField}
        type={expenseType}
        title='Expense'
      />
    </div>
  );
};

export default ExpenseForm;
