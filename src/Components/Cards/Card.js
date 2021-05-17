import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './Card.css';

const Card = ({ amount, title, form, inc, color }) => {
  return (
    <Box className='card-track'>
      <Flex justifyContent='space-between'>
        <Box>
          <Text fontSize='lg'>{title}</Text>
          <Text fontSize={24}>₹ {amount}</Text>
        </Box>
        <Box my='auto'>{form}</Box>
      </Flex>
      {inc || inc >= 0 ? (
        <Box className='percent'>
          {inc < 0 ? (
            <Flex>
              <Box className='icon'>
                <AiOutlineArrowDown color={color} />
              </Box>{' '}
              <Text color={color}>{-parseInt(inc)} % from previous month</Text>
            </Flex>
          ) : (
            <Flex>
              <Box className='icon'>
                <AiOutlineArrowUp color={color} />
              </Box>
              <Text color={color}>{parseInt(inc)} % from previous month</Text>
            </Flex>
          )}
        </Box>
      ) : (
        <Text className='save-money'>Try To Save More Money</Text>
      )}
    </Box>
  );
};

export default Card;
