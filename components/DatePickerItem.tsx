import React from 'react';
import { SingleDatepicker, SingleDatepickerProps } from 'chakra-dayzed-datepicker';

interface DatePickerItemProps extends SingleDatepickerProps {}

const DatePickerItem: React.FC<DatePickerItemProps> = ({ ...rest }) => {
  return (
    <SingleDatepicker
      {...rest}
      configs={{ firstDayOfWeek: 1, dateFormat: 'dd/MM/yyyy' }}
      propsConfigs={{
        dateNavBtnProps: {
          variant: 'outline',
          bg: 'primary.100',
          color: 'white',
          borderColor: 'transparent',
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            color: 'primary.100',
            _hover: {
              color: 'white',
              bg: 'primary.100',
            },
            borderRadius: 8,
          },
          isInRangeBtnProps: {
            color: 'white',
            bg: 'primary.200',
            borderColor: 'transparent',
          },
          selectedBtnProps: {
            bg: 'primary.100',
            color: 'white',
          },
          todayBtnProps: {
            borderRadius: 8,
            color: 'secondary.100',
          },
        },
        inputProps: {
          size: 'sm',
          width: '300px',
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
            color: 'primary.100',
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

export default DatePickerItem;
