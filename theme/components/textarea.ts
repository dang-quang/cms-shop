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
          borderColor: 'bg-border-1',
          borderRadius: '2px',
          fontSize: 'sm',
          p: '4',
          _placeholder: { color: 'secondaryGray.400' },
        }),
      },
    },
  },
};
