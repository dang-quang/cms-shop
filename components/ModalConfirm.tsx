import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const ModalConfirm = ({ title, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* Modal body content goes here */}</ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="red" mr={3} onClick={handleCancel}>
            {button1Label}
          </Button>
          <Button colorScheme="green" onClick={handleConfirm}>
            {button2Label}
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
