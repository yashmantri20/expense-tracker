import React, { useContext, useRef, useState } from 'react';
import { Button, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { firestore } from '../../firebase';
import DrawerComponent from './DrawerComponent';
import { getMonth } from '../../utils/getMonth';
import { incomeType } from '../../utils/categories';
import { MdAddCircle } from 'react-icons/md';
import { AppContext } from '../../utils/context';

const IncomeForm = () => {
  const month = getMonth();

  const [incomeCategory, setIncomeCategory] = useState('salary');
  const [amount, setAmount] = useState(0);

  const [description, setDescription] = useState('');
  const firstField = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    dispatch,
    state: { incomeMoney },
  } = useContext(AppContext);

  const incomeRef = firestore.collection(`income/1/${month}`);
  const r = firestore.collection(`income/1/${month}`).doc('Total');

  const submitHandler = () => {
    incomeRef.add({
      category: incomeCategory,
      amount: amount,
      description: description,
      date: new Date().toLocaleDateString('en-US'),
    });
    r.set(
      {
        totalmoney: parseInt(incomeMoney) + parseInt(amount),
      },
      { merge: true }
    );

    dispatch({
      type: 'SET_INCOME_MONEY',
      data: parseInt(incomeMoney) + parseInt(amount),
    });

    dispatch({
      type: 'SET_REMAINING_MONEY',
    });

    toast({
      title: 'Income Added',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <div className='App'>
      {/* <Button colorScheme='teal' borderRadius='50%' width='45px' height='45px'>
        +
      </Button> */}
      <MdAddCircle size='45px' onClick={onOpen} cursor='pointer' />

      <DrawerComponent
        onClose={onClose}
        isOpen={isOpen}
        setAmount={setAmount}
        setDescription={setDescription}
        setCategory={setIncomeCategory}
        submitHandler={submitHandler}
        firstField={firstField}
        type={incomeType}
      />
    </div>
  );
};

export default IncomeForm;
