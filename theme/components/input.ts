import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const inputStyles = {
  components: {
    Input: {
      sizes: {
        xs: {
          field: {
            h: '24px',
            borderWidth: '4px',
            borderStyle: 'solid',
          },
        },
      },
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: '8px',
        },
      },
      defaultProps: {
        focusBorderColor: 'red.600',
      },
      variants: {
        login: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('transparent', 'navy.800')(props),
            borderBottomWidth: '2px',
            color: mode('secondaryGray.900', 'white')(props),
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
            bg: mode('white', 'navy.800')(props),
            border: '1px solid',
            color: mode('text-basic', 'white')(props),
            borderColor: 'border-5',
            borderRadius: '4px',
            fontSize: '16px',
            _placeholder: { color: 'text-placeholder' },
            _focus: {
              borderColor: 'border-3',
              boxShadow: 'none',
            },
            _hover: {
              borderColor: 'border-3',
            },
            _active: {
              boxShadow: 'none',
            },
            _invalid: {
              borderColor: 'red',
              boxShadow: 'none',
            },
          },
        }),
        search: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('white', 'navy.800')(props),
            border: '1px solid',
            color: mode('text-basic', 'white')(props),
            borderColor: 'border-5',
            borderRadius: '4px',
            fontSize: '16px',
            p: '20px',
            _placeholder: { color: 'text-placeholder' },
            _focus: {
              borderColor: 'border-3',
              boxShadow: 'none',
            },
            _hover: {
              borderColor: 'border-3',
            },
            _active: {
              boxShadow: 'none',
            },
            _invalid: {
              borderColor: 'red',
              boxShadow: 'none',
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
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('white', 'navy.800')(props),
            border: '1px solid',
            color: mode('text-basic', 'white')(props),
            borderColor: 'border-5',
            borderRadius: '4px',
            fontSize: '16px',
            _placeholder: { color: 'text-placeholder' },
            _focus: {
              borderColor: 'border-3',
              boxShadow: 'none',
            },
            _hover: {
              borderColor: 'border-3',
            },
            _active: {
              boxShadow: 'none',
            },
            _invalid: {
              borderColor: 'red',
              boxShadow: 'none',
            },
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
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: mode('white', 'navy.800')(props),
            border: '1px solid',
            color: mode('text-basic', 'white')(props),
            borderColor: 'border-5',
            borderRadius: '4px',
            fontSize: '16px',
            h: '41px',
            _placeholder: { color: 'text-placeholder' },
            _focus: {
              boxShadow: 'none',
              borderColor: 'border-3',
            },
            _hover: {
              borderColor: 'border-3',
            },
            _active: {
              boxShadow: 'none',
            },
            _invalid: {
              borderColor: 'red',
              boxShadow: 'none',
            },
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
