import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Select,
  Center,
} from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const MobileTable = ({
  month,
  setMonth,
  months,
  income,
  editHandler,
  deleteHandler,
}) => {
  return (
    <Table variant='striped' colorScheme='gray' size='sm'>
      <TableCaption>Expense Tracker</TableCaption>
      <Thead>
        <Tr>
          <Th>Category</Th>
          <Th>Amount</Th>

          <Th>
            <Center>
              <Select
                width='100px'
                id='income'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m.id} value={m.monthData}>
                    {m.monthData}
                  </option>
                ))}
              </Select>
            </Center>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {income
          ? income?.map((d) => (
              <Tr key={d.id}>
                <Td>{d.category}</Td>
                <Td>₹ {d.amount}</Td>

                <Td>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-evenly'
                  >
                    <AiFillEdit
                      size='25px'
                      onClick={() => editHandler(d.id, d.amount)}
                    />
                    <AiFillDelete
                      size='25px'
                      onClick={() => deleteHandler(d.id, d.amount)}
                    />
                  </Box>
                </Td>
              </Tr>
            ))
          : 'No'}
      </Tbody>
    </Table>
  );
};

export default MobileTable;
