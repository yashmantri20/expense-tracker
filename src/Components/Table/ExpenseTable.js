import React, { useContext, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { auth, firestore } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SideDrawer from '../Drawer/EditDrawer';
import { getMonth } from '../../utils/getMonth';
import { months } from '../../utils/categories';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { AppContext } from '../../utils/context';

function ExpenseTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  const [month, setMonth] = useState(getMonth());

  const {
    dispatch,
    state: { expenseMoney },
  } = useContext(AppContext);

  const expenseRef = firestore.collection(
    `expense/${auth.currentUser.uid}/${month}`
  );

  const [expense] = useCollectionData(expenseRef, { idField: 'id' });

  const r = firestore
    .collection(`expense/${auth.currentUser.uid}/${month}`)
    .doc('Total');
  const editHandler = (id) => {
    onOpen();
    setId(id);
  };

  const deleteHandler = (id, amount) => {
    firestore
      .collection(`expense/${auth.currentUser.uid}/${month}`)
      .doc(id)
      .delete();

    r.set(
      {
        totalmoney: parseInt(expenseMoney) - parseInt(amount),
      },
      { merge: true }
    );
    dispatch({
      type: 'SET_EXPENSE_MONEY',
      data: parseInt(expenseMoney) - parseInt(amount),
    });

    dispatch({
      type: 'SET_REMAINING_MONEY',
    });

    dispatch({ type: 'SET_PERCENTAGE_EXPENSE' });
  };

  return (
    <Box>
      <Box className='mobile-tablet'>
        <MobileTable
          month={month}
          setMonth={setMonth}
          months={months}
          income={expense}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </Box>
      <Box className='desktop-tablet'>
        <DesktopTable
          month={month}
          setMonth={setMonth}
          months={months}
          income={expense}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </Box>
      {isOpen ? (
        <SideDrawer isOpen={isOpen} onClose={onClose} id={id} type='expense' />
      ) : (
        ''
      )}
    </Box>
  );
}

export default ExpenseTable;
