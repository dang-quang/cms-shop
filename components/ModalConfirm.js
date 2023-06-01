import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

const ModalConfirm = ({ isOpen, title, onClose, buttonLeft, buttonRight }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{title}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={buttonLeft.onClick}>
            {buttonLeft.title}
          </Button>
          <Button colorScheme="green" onClick={buttonRight.onClick}>
            {buttonRight.title}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
