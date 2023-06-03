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
          borderWidth: '1px',
          color: mode('secondaryGray.900', 'white')(props),
          borderColor: 'gray.700',
          borderRadius: '4px',
          fontSize: '16px',
          p: '4',
          _placeholder: { color: '#959596' },
          _focus: {
            borderColor: 'primary.100',
          },
          _hover: {
            borderColor: 'primary.100',
          },
        }),
      },
    },
  },
};
