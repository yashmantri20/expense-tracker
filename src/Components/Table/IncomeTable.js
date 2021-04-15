import React, { useContext, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  useDisclosure,
  Select,
  Center,
} from '@chakra-ui/react';
import { firestore } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import SideDrawer from '../Drawer/EditDrawer';
import { getMonth } from '../../utils/getMonth';
import { months } from '../../utils/categories';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { AppContext } from '../../utils/context';

function IncomeTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  const [month, setMonth] = useState(getMonth());

  const {
    dispatch,
    state: { incomeMoney },
  } = useContext(AppContext);

  const incomeRef = firestore.collection(`income/1/${month}`);

  const [income] = useCollectionData(incomeRef, { idField: 'id' });

  const r = firestore.collection(`income/1/${month}`).doc('Total');

  const editHandler = (id) => {
    onOpen();
    setId(id);
  };

  const deleteHandler = (id, amount) => {
    firestore.collection(`income/1/${month}`).doc(id).delete();

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
        <SideDrawer isOpen={isOpen} onClose={onClose} id={id} type='income' />
      ) : (
        ''
      )}
    </Box>
  );
}

export default IncomeTable;
