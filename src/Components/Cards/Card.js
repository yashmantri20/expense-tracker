import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const Card = ({ amount, title, form, inc, color }) => {
  return (
    <Box m='auto' width='240px' height='130px' p={6} boxShadow='xl'>
      <Flex d='flex' justifyContent='space-between'>
        <Box>
          <Text fontSize='lg' fontWeight={700}>
            {title}
          </Text>
          <Text fontSize={24} fontWeight={700}>
            ₹ {amount}
          </Text>
        </Box>
        <Box my='auto'>{form}</Box>
      </Flex>
      {inc >= 0 ? (
        <Box pt={2}>
          {' '}
          {inc < 0 ? (
            <Flex>
              <Box my='auto' pr='2px'>
                <AiOutlineArrowDown size='13px' color={color} />
              </Box>{' '}
              <Text fontSize='13px' fontWeight={700} color={color}>
                {-parseInt(inc)} % from previous month
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Box my='auto' pr='2px'>
                <AiOutlineArrowUp size='13px' color={color} />
              </Box>
              <Text fontSize='13px' fontWeight={700} color={color}>
                {parseInt(inc)} % from previous month
              </Text>
            </Flex>
          )}
        </Box>
      ) : (
        <Text fontSize='14px' fontWeight={700} color='green' pt={2} m='auto'>
          Try To Save More Money
        </Text>
      )}
    </Box>
  );
};

export default Card;
