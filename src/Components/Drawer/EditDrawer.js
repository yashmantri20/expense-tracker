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
import { auth, firestore } from '../../firebase';
import debounce from 'lodash/debounce'
import { getMonth } from '../../utils/getMonth';
import { AppContext } from '../../utils/context';

const EditDrawer = ({ id, isOpen, onClose, title, type, name }) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
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
        .collection(`${title}/${auth.currentUser.uid}/${month}`)
        .doc(id)
        .get();
      setData(res.data());

      title === 'expense'
        ? setMoney(parseInt(expenseMoney) - parseInt(res.data().amount))
        : setMoney(parseInt(incomeMoney) - parseInt(res.data().amount));

      setCategory(res.data().category);
      setAmount(res.data().amount);
      setDescription(res.data().description);
    };
    fetchData();
  }, [id, month, title, expenseMoney, incomeMoney]);

  const ref = firestore
    .collection(`${title}/${auth.currentUser.uid}/${month}`)
    .doc(id);
  const r = firestore
    .collection(`${title}/${auth.currentUser.uid}/${month}`)
    .doc('Total');

  const toast = useToast();

  const submitHandler = () => {
    if (category && amount >= 0 && description) {
      ref.update({
        category: category,
        amount: amount,
        description: description,
      });

      if (title === 'expense') {
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

      dispatch({ type: 'SET_PERCENTAGE_INCOME' });
      dispatch({ type: 'SET_PERCENTAGE_EXPENSE' });

      toast({
        title: `${name} Updated`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Please Enter The Valid Data',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const DebouncingHandler = debounce(() => { submitHandler() }, 1500)

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent style={{ background: '#272525', color: 'white' }}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Add New {name} </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px' mt={6}>
              <Box>
                <FormLabel>Select {name} Category</FormLabel>
                <Select
                  ref={firstField}
                  id={title}
                  value={category}
                  placeholder='Select a category'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {type.map((t) => (
                    <option
                      key={t.id}
                      value={t.class}
                      style={{ color: 'black' }}
                    >
                      {t.class}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box>
                <FormLabel>Amount</FormLabel>
                <Input
                  id='amount'
                  type='number'
                  placeholder='Please enter the amount'
                  defaultValue={data?.amount || ''}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea
                  maxLength={50}
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
            <Button colorScheme='blue' onClick={DebouncingHandler}>
              Update {name}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default EditDrawer;
