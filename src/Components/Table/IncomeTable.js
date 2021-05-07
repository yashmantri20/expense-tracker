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
import { incomeType } from '../../utils/categories';

function IncomeTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  const [month, setMonth] = useState(getMonth());

  const {
    dispatch,
    state: { incomeMoney },
  } = useContext(AppContext);

  const incomeRef = firestore.collection(
    `income/${auth.currentUser.uid}/${month}`
  );

  const [income] = useCollectionData(incomeRef, { idField: 'id' });

  const r = firestore
    .collection(`income/${auth.currentUser.uid}/${month}`)
    .doc('Total');

  const editHandler = (id) => {
    onOpen();
    setId(id);
  };

  const deleteHandler = (id, amount) => {
    firestore
      .collection(`income/${auth.currentUser.uid}/${month}`)
      .doc(id)
      .delete();

    if (month === getMonth()) {
      r.set(
        {
          totalmoney: parseInt(incomeMoney) - parseInt(amount),
        },
        { merge: true }
      );

      dispatch({
        type: 'SET_INCOME_MONEY',
        data: parseInt(incomeMoney) - parseInt(amount),
      });

      dispatch({
        type: 'SET_REMAINING_MONEY',
      });

      dispatch({ type: 'SET_PERCENTAGE_INCOME' });
    }
  };

  return (
    <Box>
      <Box className='mobile-tablet'>
        <MobileTable
          month={month}
          setMonth={setMonth}
          months={months}
          income={income}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </Box>
      <Box className='desktop-tablet'>
        <DesktopTable
          month={month}
          setMonth={setMonth}
          months={months}
          income={income}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </Box>
      {isOpen ? (
        <SideDrawer
          isOpen={isOpen}
          onClose={onClose}
          id={id}
          title='income'
          name='Income'
          type={incomeType}
        />
      ) : (
        ''
      )}
    </Box>
  );
}

export default IncomeTable;
