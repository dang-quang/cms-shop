import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const textareaStyles = {
  components: {
    Textarea: {
      defaultProps: {
        variant: 'basic',
      },
      baseStyle: {
        fontWeight: 400,
        borderRadius: '2px',
      },
      variants: {
        basic: (props: StyleFunctionProps) => ({
          bg: mode('white', 'navy.800')(props),
          border: '1px solid',
          color: mode('text-basic', 'white')(props),
          borderColor: 'border-5',
          borderRadius: '4px',
          fontSize: '16px',
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
        }),
      },
    },
  },
};
