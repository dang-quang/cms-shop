import React from 'react';
import {
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ModalUpdateFeaturedProductProps {
  onClose?(): void;
}

const ModalUpdateFeaturedProduct: React.FC<ModalUpdateFeaturedProductProps> = ({ onClose }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text>Modal Content</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ModalUpdateFeaturedProduct;
