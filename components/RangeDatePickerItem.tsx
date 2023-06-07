import React from 'react';
import { RangeDatepicker, RangeDatepickerProps } from 'chakra-dayzed-datepicker';
import { Center, HStack, Icon, useBoolean } from '@chakra-ui/react';
import { BiCalendar } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { isEmpty } from 'lodash';

interface RangeDatePickerItemProps extends RangeDatepickerProps {
  onClear?(): void;
}

const RangeDatePickerItem: React.FC<RangeDatePickerItemProps> = ({
  onClear,
  selectedDates,
  ...rest
}) => {
  const [isOpen, { on, off }] = useBoolean();

  return (
    <HStack
      bg="bg-1"
      h="42px"
      borderRadius="4px"
      position="relative"
      w="fit-content"
      borderWidth="1px"
      borderColor="border-5"
      onMouseEnter={on}
      onMouseLeave={off}
      onBlur={off}
      _hover={{ borderColor: 'border-3' }}>
      <Center w="32px" h="100%" position="absolute" ml="3">
        <Icon as={BiCalendar} w="24px" h="24px" color="white" fill="border-1" />
      </Center>
      <RangeDatepicker
        {...rest}
        selectedDates={selectedDates}
        configs={{ firstDayOfWeek: 1, dateFormat: 'dd/MM/yyyy' }}
        propsConfigs={{
          dateNavBtnProps: {
            variant: 'outline',
            bg: 'transparent',
            color: 'text-basic',
            borderColor: 'transparent',
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              color: 'text-basic',
              _hover: {
                bg: 'primary.100',
                color: 'white',
              },
              borderRadius: 8,
            },
            isInRangeBtnProps: {
              color: 'text-basic',
              bg: 'primary.600',
              borderColor: 'transparent',
            },
            selectedBtnProps: {
              bg: 'primary.100',
              color: 'white',
            },
            todayBtnProps: {
              borderRadius: 8,
              color: 'primary.100',
              fontWeight: '500',
            },
          },
          inputProps: {
            size: 'lg',
            width: '350px',
            pl: '52px',
            placeholder: 'Select date range to search',
            color: 'text-basic',
            fontWeight: '400',
            borderRadius: 8,
            bg: 'transparent',
            borderWidth: '0px',
            cursor: 'pointer',
            _active: {
              borderColor: 'primary.100',
            },
            _focus: {
              borderColor: 'primary.100',
            },
            _hover: {
              borderColor: 'primary.100',
            },
          },
          popoverCompProps: {
            popoverContentProps: {
              borderRadius: '8px',
              color: 'text-basic',
              borderColor: 'gray.1300',
              _hover: {
                borderColor: 'gray.1300',
              },
              _focus: {
                borderColor: 'gray.1300',
              },
            },
            popoverBodyProps: {
              borderColor: 'gray.1300',
              borderRadius: 8,
            },
          },
        }}
      />
      {isOpen && !isEmpty(selectedDates) && onClear && (
        <Center
          w="32px"
          h="100%"
          position="absolute"
          cursor="pointer"
          right="0"
          onClick={(e) => {
            onClear && onClear();
          }}>
          <Icon as={AiOutlineCloseCircle} w="16px" h="16px" color="white" fill="border-1" />
        </Center>
      )}
    </HStack>
  );
};

export default RangeDatePickerItem;
