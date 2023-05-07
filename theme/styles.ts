import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const globalStyles = {
  colors: {
    red: {
      100: '#FDEFED',
      500: '#EE5D50',
      600: '#E31A1A',
    },
    primary: {
      100: '#f77927',
      200: '#e68f55',
      300: '#f96606',
      400: '#ffe2cf',
    },
    warning: {
      100: '#ff9800',
      200: '#ffa726',
      300: '#fb8c00',
      400: '#ffa21a',
    },
    danger: {
      100: '#f44336',
      200: '#ef5350',
      300: '#e53935',
      400: '#f55a4e',
    },
    orange: {
      100: '#b34f08',
    },
    blue: {
      100: '#0541af',
      200: '#0A71D0',
    },
    black: '#000000',
    white: '#FFFFFF',
    green: {
      100: '#45b75e',
    },
    yellowColor: {
      100: '#ffd000',
    },
    gray: {
      100: '#999',
      200: '#777',
      300: '#3C4858',
      400: '#AAAAAA',
      500: '#D2D2D2',
      600: '#DDD',
      700: '#b4b4b4',
      800: '#555555',
      900: '#333',
      1000: '#a9afbb',
      1100: '#eee',
      1200: '#e7e7e7',
      1300: '#E2E2E2',
      1400: '#212121',
      1500: '#263238',
      1600: '#E0E0E0',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('secondaryGray.300', 'navy.900')(props),
        fontFamily: 'Roboto',
        letterSpacing: '-0.5px',
      },
      input: {
        color: 'gray.700',
      },
      html: {
        fontFamily: 'Roboto',
      },
    }),
  },
};
