import React from 'react';
import { Box, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';

import { IconPlusCircle } from 'components/Icons/Icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const SelectProduct = React.forwardRef(({ title, image, inputProps, removeImage }, ref) => {
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    click: () => {
      inputRef.current?.click();
    },
  }));

  const click = () => {
    inputRef.current.click();
  };

  return (
    <Box onClick={click} position="relative">
      <Flex
        w="100%"
        h="150px"
        borderWidth={image ? '0px' : '1px'}
        borderStyle="dashed"
        borderColor="blue.200"
        justifyContent="center"
        alignItems="center"
        cursor="pointer">
        {image ? (
          <Image src={image} w="100%" h="100%" objectFit="cover" />
        ) : (
          <Icon as={IconPlusCircle} width="44px" height="44px" color="blue.200" />
        )}
      </Flex>
      <Input type="file" display="none" ref={inputRef} {...inputProps} />
      <Text textAlign="center" mt="5">
        {title}
      </Text>
      {image && (
        <Icon
          as={AiOutlineCloseCircle}
          width="24px"
          height="24px"
          color="blue.200"
          position="absolute"
          right="4px"
          top="4px"
          onClick={(e) => {
            e.stopPropagation();
            removeImage && removeImage();
          }}
        />
      )}
    </Box>
  );
});

export default SelectProduct;
