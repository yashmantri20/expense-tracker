import React, { useState } from 'react';
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
import SideDrawer from '../Drawer/Drawer';

function IncomeTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');
  const [month, setMonth] = useState(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][new Date().getMonth()]
  );
  const incomeRef = firestore.collection(`income/1/${month}`);

  const [income] = useCollectionData(incomeRef, { idField: 'id' });

  console.log(income);
  const editHandler = (id) => {
    onOpen();
    setId(id);
  };

  const deleteHandler = (id) => {
    firestore.collection(`income/1/April`).doc(id).delete();
  };

  return (
    <Box>
      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>
              {/* <Flex>
                <Text m='auto'>Filter</Text> */}
              <Center>
                <Select
                  width='100px'
                  id='income'
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value='March'>March</option>
                  <option value='April'>April</option>
                </Select>
              </Center>
              {/* </Flex> */}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {income?.map((d) => (
            <Tr>
              <Td>{d.incomeCategory}</Td>
              <Td>₹ {d.amount}</Td>
              <Td>{d.date}</Td>

              <Td>{d.description}</Td>
              <Td>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-evenly'
                >
                  <AiFillEdit size='25px' onClick={() => editHandler(d.id)} />
                  <AiFillDelete
                    size='25px'
                    onClick={() => deleteHandler(d.id)}
                  />
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isOpen ? <SideDrawer isOpen={isOpen} onClose={onClose} id={id} /> : ''}
    </Box>
  );
}

export default IncomeTable;
