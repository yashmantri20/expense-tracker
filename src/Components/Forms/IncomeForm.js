import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { firestore } from '../../firebase';

const IncomeForm = () => {
  const month = [
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
  ][new Date().getMonth()];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [incomeCategory, setIncomeCategory] = useState('salary');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const firstField = React.useRef();

  const incomeRef = firestore.collection(`income/1/${month}`);

  const toast = useToast();

  const submitHandler = () => {
    incomeRef.add({
      incomeCategory: incomeCategory,
      amount: amount,
      description: description,
      date: new Date().toLocaleDateString('en-US'),
    });
    toast({
      title: `toast`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <div className='App'>
      <Button colorScheme='teal' onClick={onOpen}>
        Create user
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Add New Income</DrawerHeader>

            <DrawerBody>
              <Stack spacing='24px' mt={6}>
                <Box>
                  <FormLabel htmlFor='income'>Select Income Category</FormLabel>
                  <Select
                    ref={firstField}
                    id='income'
                    defaultValue='salary'
                    onChange={(e) => setIncomeCategory(e.target.value)}
                  >
                    <option value='salary'>Salary</option>
                    <option value='pocketmoney'>Pocket Money</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel htmlFor='income'>Amount</FormLabel>
                  <Input
                    id='income'
                    placeholder='Please enter user name'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea
                    id='desc'
                    maxLength={50}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={submitHandler}>
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default IncomeForm;
