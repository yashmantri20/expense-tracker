import React, { useEffect, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { firestore } from '../../firebase';

const SideDrawer = ({ id, isOpen, onClose }) => {
  const [data, setData] = useState([]);
  const [incomeCategory, setIncomeCategory] = useState('salary');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const firstField = React.useRef();
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await firestore.collection(`income/1/${month}`).doc(id).get();
      setData(res.data());
      setIncomeCategory(res.data().incomeCategory);
      setAmount(res.data().amount);
      setDescription(res.data().description);
    };
    fetchData();
  }, [id, month]);

  const incomeRef = firestore.collection(`income/1/${month}`).doc(id);

  const toast = useToast();

  const submitHandler = () => {
    incomeRef.update({
      incomeCategory: incomeCategory,
      amount: amount,
      description: description,
    });
    toast({
      title: `toast`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
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
                  value={data?.incomeCategory}
                  placeholder='Select a category'
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
                  defaultValue={data?.amount || ''}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea
                  id='desc'
                  defaultValue={data?.description || ''}
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
  );
};

export default SideDrawer;
