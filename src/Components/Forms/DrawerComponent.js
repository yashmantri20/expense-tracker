import React from 'react';
import {
  Button,
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
  Drawer,
} from '@chakra-ui/react';

const DrawerComponent = ({
  submitHandler,
  onClose,
  setCategory,
  setAmount,
  setDescription,
  firstField,
  isOpen,
  type,
}) => {
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
                  placeholder='Select a category'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {type.map((t) => (
                    <option key={t.id} value={t.class}>
                      {t.class}
                    </option>
                  ))}
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
  );
};

export default DrawerComponent;
