import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: '4px',
        boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
        transition: '.25s all ease',
        boxSizing: 'border-box',
        fontWeight: '400',
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
      variants: {
        outline: (props: StyleFunctionProps) => ({
          bg: 'transparent',
          color: 'primary.100',
          borderWidth: '1px',
          borderColor: 'primary.100',
          _focus: {
            bg: mode('primary.200', 'primary.200')(props),
            color: 'white',
            borderColor: 'transparent',
          },
          _active: {
            bg: mode('primary.100', 'primary.100')(props),
            color: 'white',
            borderColor: 'transparent',
          },
          _hover: {
            bg: mode('primary.100', 'primary.100')(props),
            color: 'white',
            borderColor: 'transparent',
          },
        }),
        primary: (props: StyleFunctionProps) => ({
          bg: 'primary.100',
          color: 'white',
          _focus: {
            bg: mode('primary.200', 'primary.200')(props),
          },
          _active: {
            bg: mode('primary.200', 'primary.200')(props),
          },
          _hover: {
            bg: mode('primary.200', 'primary.200')(props),
            _disabled: {
              bg: 'primary.100',
              color: 'white',
            },
          },
          _disabled: {
            bg: 'primary.100',
            color: 'white',
          },
        }),
        secondary: (props: StyleFunctionProps) => ({
          bg: mode('secondary.100', 'secondary.100')(props),
          color: 'white',
          _focus: {
            bg: mode('secondary.100', 'secondary.100')(props),
          },
          _active: {
            bg: mode('secondary.100', 'secondary.100')(props),
          },
          _hover: {
            bg: mode('secondary.100', 'secondary.100')(props),
          },
        }),
        control: (props: StyleFunctionProps) => ({
          bg: mode('gray.1700', 'gray.1700')(props),
          color: 'white',
          _focus: {
            bg: mode('gray.1600', 'gray.1600')(props),
          },
          _active: {
            bg: mode('gray.1600', 'gray.1600')(props),
          },
          _hover: {
            bg: mode('gray.1600', 'gray.1600')(props),
          },
        }),
        success: (props: StyleFunctionProps) => ({
          bg: mode('green.100', 'green.100')(props),
          color: 'white',
          _focus: {
            bg: mode('green.100', 'green.100')(props),
          },
          _active: {
            bg: mode('green.100', 'green.100')(props),
          },
          _hover: {
            bg: mode('green.100', 'green.100')(props),
          },
        }),
        danger: (props: StyleFunctionProps) => ({
          bg: mode('red', 'red')(props),
          color: 'white',
          _focus: {
            bg: mode('red', 'red')(props),
          },
          _active: {
            bg: mode('red', 'red')(props),
          },
          _hover: {
            bg: mode('red', 'red')(props),
          },
        }),
        'outline-danger': (props: StyleFunctionProps) => ({
          borderColor: mode('red', 'red')(props),
          borderWidth: '1px',
          bg: 'transparent',
          color: 'red',
          _focus: {
            bg: mode('red', 'red')(props),
          },
          _active: {
            bg: mode('red', 'red')(props),
          },
          _hover: {
            bg: mode('red', 'red')(props),
            color: 'white',
          },
        }),
        'outline-control': (props: StyleFunctionProps) => ({
          bg: 'transparent',
          borderColor: 'border-5',
          color: 'text-basic',
          borderWidth: '1px',
          borderRadius: '4px',
          _focus: {
            bg: 'bg-2',
          },
          _active: {
            bg: 'bg-3',
          },
          _hover: {
            borderColor: 'border-3',
            bg: 'bg-2',
          },
        }),
      },
    },
  },
};
