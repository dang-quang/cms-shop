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
        <ModalHeader fontWeight="medium" color="text-basic">
          {title}
        </ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <ModalBody>
          <Text textStyle="h3" color="text-basic">
            {description}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline-control"
            size="sm"
            minW="80px"
            mr={3}
            onClick={buttonLeft.onClick}>
            {buttonLeft.title}
          </Button>
          <Button size="sm" variant="primary" minW="80px" onClick={buttonRight.onClick}>
            {buttonRight.title}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
