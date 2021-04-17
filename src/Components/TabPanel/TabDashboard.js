import React from 'react';
import { Center } from '@chakra-ui/layout';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/tabs';
import ExpenseTable from '../Table/ExpenseTable';
import IncomeTable from '../Table/IncomeTable';
import PieChart from '../Chart/PieChart';

const TabDashboard = () => {
  return (
    <Center>
      <Tabs variant='soft-rounded' colorScheme='gray' mt={16} width='95%'>
        <Center>
          <TabList>
            <Tab color='white'>Income</Tab>
            <Tab color='white'>Expense</Tab>
            <Tab color='white' className='analysis'>
              Analysis
            </Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel px={0}>
            <IncomeTable />
          </TabPanel>
          <TabPanel px={0}>
            <ExpenseTable />
          </TabPanel>
          <TabPanel>
            <PieChart />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default TabDashboard;
