import { StyleConfig } from '@chakra-ui/theme-tools';

export const skeletonStyles: { components: { Skeleton: StyleConfig } } = {
  components: {
    Skeleton: {
      baseStyle: {
        borderRadius: '4px',
        lineHeight: '100%',
        h: '10px',
        w: 'full',
      },
      variants: {},
    },
  },
};
