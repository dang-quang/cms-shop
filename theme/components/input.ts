import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 300,
          borderRadius: '8px',
        },
      },

      variants: {
        login: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            borderBottomWidth: '2px',
            color: mode('secondaryGray.900', 'white')(props),
            focusBorderColor: 'red',
            borderColor: 'gray.200',
            borderRadius: '0px',
            fontSize: '14px',
            py: '5',
            px: '0',
            _placeholder: { color: 'secondaryGray.600' },
            _focus: {
              borderColor: 'primary.100',
            },
          },
        }),
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            border: '1px solid',
            color: mode('secondaryGray.900', 'white')(props),
            borderColor: 'bg-border-1',
            borderRadius: '0px',
            fontSize: '14px',
            p: '20px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        search: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            border: '1px solid',
            color: mode('text-basic', 'white')(props),
            borderColor: 'gray.1300',
            borderRadius: '8px',
            fontSize: '14px',
            p: '20px',
            _placeholder: { color: 'gray.1900' },
            _focus: {
              borderColor: 'primary.100',
            },
            _hover: {
              borderColor: 'primary.100',
            },
          },
        }),
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: () => ({
          field: {
            bg: 'transparent',
            border: '1px solid',
            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        auth: () => ({
          field: {
            bg: 'transparent',
            border: '1px solid',

            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        authSecondary: () => ({
          field: {
            bg: 'transparent',
            border: '1px solid',
            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        search: () => ({
          field: {
            border: 'none',
            py: '11px',
            borderRadius: '8px',
            bg: 'red',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            border: '1px solid',
            color: 'secondaryGray.600',
            borderColor: mode('secondaryGray.100', 'whiteAlpha.100')(props),
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
          icon: {
            color: 'secondaryGray.600',
          },
        }),
        mini: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            border: '0px solid transparent',
            fontSize: '0px',
            p: '10px',
            _placeholder: { color: 'secondaryGray.600' },
          },
          icon: {
            color: 'secondaryGray.600',
          },
        }),
        subtle: () => ({
          box: {
            width: 'unset',
          },
          field: {
            bg: 'transparent',
            border: '0px solid',
            color: 'secondaryGray.600',
            borderColor: 'transparent',
            width: 'max-content',
            _placeholder: { color: 'secondaryGray.600' },
          },
          icon: {
            color: 'secondaryGray.600',
          },
        }),
        transparent: (props: StyleFunctionProps) => ({
          field: {
            bg: 'transparent',
            border: '0px solid',
            width: 'min-content',
            color: mode('secondaryGray.600', 'secondaryGray.600')(props),
            borderColor: 'transparent',
            padding: '0px',
            paddingLeft: '8px',
            paddingRight: '20px',
            fontWeight: '700',
            fontSize: '14px',
            _placeholder: { color: 'secondaryGray.600' },
          },
          icon: {
            transform: 'none !important',
            position: 'unset !important',
            width: 'unset',
            color: 'secondaryGray.600',
            right: '0px',
          },
        }),
        auth: () => ({
          field: {
            bg: 'transparent',
            border: '1px solid',

            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        authSecondary: (props: StyleFunctionProps) => ({
          field: {
            bg: 'transparent',
            border: '1px solid',

            borderColor: 'secondaryGray.100',
            borderRadius: '16px',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
        search: (props: StyleFunctionProps) => ({
          field: {
            border: 'none',
            py: '11px',
            borderRadius: 'inherit',
            _placeholder: { color: 'secondaryGray.600' },
          },
        }),
      },
    },
  },
};
