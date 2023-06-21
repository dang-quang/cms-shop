import { StyleConfig } from '@chakra-ui/theme-tools';

export const formError: { components: { FormError: StyleConfig } } = {
  components: {
    FormError: {
      baseStyle: {
        text: {
          color: 'red',
          fontSize: '12px',
          fontWeight: '400',
        },
      },
    },
  },
};
