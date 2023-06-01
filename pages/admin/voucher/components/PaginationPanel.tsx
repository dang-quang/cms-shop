import React from 'react';
import { Box, BoxProps } from '@chakra-ui/layout';
import {
  Pagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination';
import { Icon } from '@chakra-ui/react';
import { IconLeftArrow, IconRightArrow } from 'components/Icons/Icons';

interface PaginationPanelProps extends BoxProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  pagesCount: number;
  isDisabled?: boolean;
  pages: number[];
}

const PaginationPanel: React.FC<PaginationPanelProps> = ({
  pagesCount,
  currentPage,
  isDisabled,
  pages,
  onPageChange,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={onPageChange}>
        <PaginationContainer align="center" justify="center" w="full">
          <PaginationPrevious
            _hover={{
              bg: 'primary.100',
              opacity: 1,
              color: 'white',
            }}
            color="text-basic"
            bg="transparent"
            mr="12px"
            w="40px"
            h="40px"
            borderRadius="0px">
            <Icon as={IconLeftArrow} w="16px" h="16px" />
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                w="40px"
                h="40px"
                bg="transparent"
                fontSize="md"
                fontWeight="500"
                jumpSize={11}
              />
            }>
            {pages.map((page: number) => (
              <PaginationPage
                w="40px"
                h="40px"
                key={`pagination_page_${page}`}
                page={page}
                borderRadius="0px"
                bg="transparent"
                onClick={() => {}}
                fontSize="md"
                fontWeight="500"
                color="text-basic"
                borderBottomColor="transparent"
                _focus={{
                  borderBottom: '2px',
                  borderBottomColor: 'primary.100',
                  color: 'primary.100',
                }}
                _hover={{
                  opacity: 1,
                  color: 'white',
                  bg: 'primary.100',
                  borderBottomColor: 'primary.100',
                }}
                _current={{
                  borderBottomWidth: '2px',
                  fontSize: 'md',
                  borderBottomColor: 'primary.100',
                  bg: 'transparent',
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              opacity: 1,
              bg: 'primary.100',
              color: 'white',
            }}
            color="text-basic"
            bg="transparent"
            ml="12px"
            w="40px"
            h="40px"
            borderRadius="0px">
            <Icon as={IconRightArrow} w="16px" h="16px" />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Box>
  );
};

export default PaginationPanel;
