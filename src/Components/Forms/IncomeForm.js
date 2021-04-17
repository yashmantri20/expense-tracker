import React, { useContext, useRef, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { auth, firestore } from '../../firebase';
import DrawerComponent from './DrawerComponent';
import { getMonth } from '../../utils/getMonth';
import { incomeType } from '../../utils/categories';
import { MdAddCircle } from 'react-icons/md';
import { AppContext } from '../../utils/context';

const IncomeForm = () => {
  const month = getMonth();

  const [incomeCategory, setIncomeCategory] = useState();
  const [amount, setAmount] = useState();

  const [description, setDescription] = useState();
  const firstField = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    dispatch,
    state: { incomeMoney },
  } = useContext(AppContext);

  const incomeRef = firestore.collection(
    `income/${auth.currentUser.uid}/${month}`
  );
  const r = firestore
    .collection(`income/${auth.currentUser.uid}/${month}`)
    .doc('Total');

  const submitHandler = () => {
    if (incomeCategory && amount >= 0 && description) {
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

      dispatch({ type: 'SET_PERCENTAGE_INCOME' });

      toast({
        title: 'Income Added',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setDescription();
      setAmount();
      setIncomeCategory();
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
        title='Income'
      />
    </div>
  );
};

export default IncomeForm;
