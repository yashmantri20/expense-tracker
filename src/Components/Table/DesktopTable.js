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
  Link,
} from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const DesktopTable = ({
  month,
  setMonth,
  months,
  income,
  editHandler,
  deleteHandler,
}) => {
  return (
    <Table variant='striped' colorScheme='gray' size='sm' color='black'>
      <TableCaption fontSize='15px' color='white'>Made with ❤ by <Link isExternal href='https://www.linkedin.com/in/yashmantri20/'>Yash Mantri</Link></TableCaption>
      <Thead>
        <Tr>
          <Th>Category</Th>
          <Th>Amount</Th>
          <Th>Date</Th>
          <Th>Description</Th>
          <Th>
            <Center>
              <Select
                width='100px'
                id='income'
                outline='none'
                border='none'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option
                    key={m.id}
                    value={m.monthData}
                    style={{ color: 'black' }}
                  >
                    {m.monthData}
                  </option>
                ))}
              </Select>
            </Center>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {income?.map((d) =>
          d.id !== 'Total' ? (
            <Tr key={d.id} className='table-data'>
              <Td>{d.category}</Td>
              <Td>₹ {d.amount}</Td>
              <Td>{d.date}</Td>

              <Td>{d.description}</Td>
              <Td>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-evenly'
                >
                  <AiFillEdit
                    size='25px'
                    cursor='pointer'
                    onClick={() => editHandler(d.id, d.amount)}
                  />
                  <AiFillDelete
                    cursor='pointer'
                    size='25px'
                    onClick={() => deleteHandler(d.id, d.amount)}
                  />
                </Box>
              </Td>
            </Tr>
          ) : null
        )}
      </Tbody>
    </Table>
  );
};

export default DesktopTable;
