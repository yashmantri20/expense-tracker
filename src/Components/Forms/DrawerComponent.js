import React from 'react';
import debounce from 'lodash/debounce'
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
  title,
}) => {

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
          <DrawerHeader borderBottomWidth='1px'>Add New {title}</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px' mt={6}>
              <Box>
                <FormLabel htmlFor={title}>Select {title} Category</FormLabel>
                <Select
                  borderColor='grey'
                  ref={firstField}
                  id={title}
                  required
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
                <FormLabel htmlFor={title}>Amount</FormLabel>
                <Input
                  type='number'
                  borderColor='grey'
                  id={title}
                  required
                  placeholder='Please enter the amount'
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel>Description</FormLabel>
                <Textarea
                  borderColor='grey'
                  required
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
            <Button colorScheme='blue' onClick={DebouncingHandler}>
              Add {title}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerComponent;
