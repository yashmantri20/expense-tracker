import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import './Card.css';

const PrevMonthCard = ({ amount, title, form, income, expense }) => {
  return (
    <Box className='card-track'>
      <Flex justifyContent='space-between'>
        <Box>
          <Text fontSize='lg'>{title}</Text>
          <Text fontSize={16} pt={2}>
            Income: ₹ {income}
          </Text>
          <Text fontSize={16}>Expense: ₹ {expense}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PrevMonthCard;
