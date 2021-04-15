import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { getMonth } from '../../utils/getMonth';
import { AppContext } from '../../utils/context';

const EditDrawer = ({ id, isOpen, onClose, type }) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('salary');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [money, setMoney] = useState(0);

  const firstField = useRef();
  const month = getMonth();

  const {
    dispatch,
    state: { expenseMoney, incomeMoney },
  } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await firestore
        .collection(`${type}/1/${month}`)
        .doc(id)
        .get();
      setData(res.data());

      // type === 'expense'
      //   ? dispatch({
      //       type: 'SET_EXPENSE_MONEY',
      //       data: parseInt(expenseMoney) - parseInt(res.data().amount),
      //     })
      //   : dispatch({
      //       type: 'SET_INCOME_MONEY',
      //       data: parseInt(incomeMoney) - parseInt(res.data().amount),
      //     });

      type === 'expense'
        ? setMoney(parseInt(expenseMoney) - parseInt(res.data().amount))
        : setMoney(parseInt(incomeMoney) - parseInt(res.data().amount));

      setCategory(res.data().category);
      setAmount(res.data().amount);
      setDescription(res.data().description);
    };
    fetchData();
  }, [id, month, type]);

  const ref = firestore.collection(`${type}/1/${month}`).doc(id);
  const r = firestore.collection(`${type}/1/${month}`).doc('Total');

  const toast = useToast();

  const submitHandler = () => {
    ref.update({
      category: category,
      amount: amount,
      description: description,
    });

    console.log(money);
    if (type === 'expense') {
      r.set(
        {
          totalmoney: money + parseInt(amount),
        },
        { merge: true }
      );

      dispatch({
        type: 'SET_EXPENSE_MONEY',
        data: money + parseInt(amount),
      });
    } else {
      r.set(
        {
          totalmoney: money + parseInt(amount),
        },
        { merge: true }
      );
      dispatch({
        type: 'SET_INCOME_MONEY',
        data: money + parseInt(amount),
      });
    }

    dispatch({
      type: 'SET_REMAINING_MONEY',
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
                  value={data?.category}
                  placeholder='Select a category'
                  onChange={(e) => setCategory(e.target.value)}
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

export default EditDrawer;
