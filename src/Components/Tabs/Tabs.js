import { Center } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/tabs';
import React from 'react';
import ExpenseTable from '../Table/ExpenseTable';
import IncomeTable from '../Table/IncomeTable';

const Tabs = () => {
  return (
    <Center>
      <Tabs variant='soft-rounded' colorScheme='gray' mt={16} width='95%'>
        <Center>
          <TabList>
            <Tab color='white'>Income</Tab>
            <Tab color='white'>Expense</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel px={0}>
            <IncomeTable />
          </TabPanel>
          <TabPanel px={0}>
            <ExpenseTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default Tabs;
