import React from 'react';
import { RangeDatepicker, RangeDatepickerProps } from 'chakra-dayzed-datepicker';

interface RangeDatePickerItemProps extends RangeDatepickerProps {}

const RangeDatePickerItem: React.FC<RangeDatePickerItemProps> = ({ ...rest }) => {
  return (
    <RangeDatepicker
      {...rest}
      configs={{ firstDayOfWeek: 1, dateFormat: 'dd/MM/yyyy' }}
      propsConfigs={{
        dateNavBtnProps: {
          variant: 'outline',
          bg: 'secondary.100',
          color: 'white',
          borderColor: 'transparent',
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            color: 'secondary.100',
            _hover: {
              color: 'white',
              bg: 'secondary.100',
            },
            borderRadius: 8,
          },
          isInRangeBtnProps: {
            color: 'secondary.100',
            bg: 'secondary.200',
            borderColor: 'transparent',
          },
          selectedBtnProps: {
            bg: 'secondary.100',
            color: 'white',
          },
          todayBtnProps: {
            borderRadius: 8,
            borderColor: 'primary.100',
            color: 'primary.100',
            bg: 'secondary.100',
          },
        },
        inputProps: {
          size: 'sm',
          width: '200px',
          borderColor: 'gray.1300',
          color: 'text-basic',
          fontWeight: '300',
          borderRadius: 8,
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
            color: 'secondary.100',
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
  );
};

export default RangeDatePickerItem;
