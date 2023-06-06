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

const ModalConfirm = ({ isOpen, title, description, onClose, buttonLeft, buttonRight }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick size="lg">
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <ModalBody>
          <Text textAlign="center" color="text-basic">
            {description}
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="space-around" mt="8">
          <Button variant="outline-danger" minW="150px" mr={3} onClick={buttonLeft.onClick}>
            {buttonLeft.title}
          </Button>
          <Button variant="primary" minW="150px" onClick={buttonRight.onClick}>
            {buttonRight.title}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
