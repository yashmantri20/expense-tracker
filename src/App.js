import './App.css';
import React from 'react';
import IncomeForm from './Components/Forms/IncomeForm';
import ExpenseForm from './Components/Forms/ExpenseForm';
import IncomeTable from './Components/Table/IncomeTable';
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/image';

function App() {
  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacingX={16}>
        <Box
          m='auto'
          width='250px'
          height='110px'
          bg='gray.50'
          p={4}
          boxShadow='xl'
        >
          <Flex d='flex' justifyContent='space-between'>
            <Box>
              <Text fontWeight={700}>Income</Text>
              <Text fontWeight={700}>Rs 5000</Text>
            </Box>
            <Image
              width='48px'
              height='48px'
              src='https://ik.imagekit.io/codewarriors/salary-icon-16586_9byGk1a8n.png'
            />
          </Flex>
        </Box>
        <Box m='auto' width='250px' height='110px' bg='gray.200'>
          Yahs
        </Box>
        <Box m='auto' width='250px' height='110px' bg='gray.200'>
          Yahs
        </Box>
        <Box m='auto' width='250px' height='110px' bg='gray.200'>
          Yahs
        </Box>
      </SimpleGrid>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <Center>
          <TabList>
            <Tab>Income</Tab>
            <Tab>Expense</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel style={{ width: '100%', padding: '0px' }}>
            <IncomeTable />
          </TabPanel>
          <TabPanel>
            <ExpenseForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <IncomeForm />
    </Box>
  );
}

export default App;
