import { mode, StyleConfig, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const radioStyles: { components: { Radio: StyleConfig } } = {
  components: {
    Radio: {
      baseStyle: {
        width: '40px',
        control: {
          borderWidth: 1,
          _checked: {
            padding: 1,
            bg: 'white',
            borderWidth: 1,
            borderColor: 'primary.100',
            _before: {
              padding: 1,
              bg: 'primary.100',
              borderColor: 'red',
            },
            _hover: {
              bg: 'unset',
              borderColor: 'unset',
            },
          },
          _focus: {
            boxShadow: 'none',
          },
        },
      },
      sizes: {
        lg: {
          label: { fontSize: '16px', color: 'text-basic' },
        },
      },
      variants: {
        custom: {
          control: {
            _checked: {
              bg: 'primary.100',
              borderColor: 'blue.500',
            },
          },
        },
      },
    },
  },
};
