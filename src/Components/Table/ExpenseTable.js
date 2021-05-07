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
import { expenseType } from '../../utils/categories';

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

    if (month === getMonth()) {
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
    }
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
        <SideDrawer
          isOpen={isOpen}
          onClose={onClose}
          id={id}
          title='expense'
          name='Expense'
          type={expenseType}
        />
      ) : (
        ''
      )}
    </Box>
  );
}

export default ExpenseTable;
