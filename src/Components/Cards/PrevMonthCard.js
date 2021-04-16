import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';

const PrevMonthCard = ({ amount, title, form, income, expense }) => {
  return (
    <Box m='auto' width='240px' height='130px' p={6} boxShadow='xl'>
      <Flex d='flex' justifyContent='space-between'>
        <Box>
          <Text fontSize='lg' fontWeight={700}>
            {title}
          </Text>
          <Text fontSize={16} fontWeight={700} pt={2}>
            Income: ₹ {income}
          </Text>
          <Text fontSize={16} fontWeight={700}>
            Expense: ₹ {expense}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PrevMonthCard;
