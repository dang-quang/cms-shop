import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const textareaStyles = {
  components: {
    Textarea: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: '16px',
        },
      },
      variants: {
        basic: (props: StyleFunctionProps) => ({
          field: {
            //bg: mode('transparent', 'navy.800')(props),
            bg: 'red',
            border: '1px solid !important',
            borderWidth: '1px',
            color: mode('secondaryGray.900', 'white')(props),
            //borderColor: mode('secondaryGray.100', 'whiteAlpha.100')(props),
            borderColor: 'red',
            borderRadius: '16px',
            fontSize: 'sm',
            p: '20px',
            _placeholder: { color: 'secondaryGray.400' },
          },
        }),
      },
    },
  },
};
