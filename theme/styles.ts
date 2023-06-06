import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
export const globalStyles = {
  colors: {
    red: {
      100: '#FDEFED',
      500: '#EE5D50',
      600: '#E31A1A',
      700: '#E31A1A20',
    },
    primary: {
      100: '#F28230',
      200: '#e68f55',
      600: '#FEF1EF',
    },
    secondary: {
      100: '#00659F',
      200: '#00659F50',
    },
    warning: {
      100: '#ff9800',
      200: '#ff980020',
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
      200: '#45b75e20',
    },
    yellowColor: {
      100: '#ffd000',
    },
    gray: {
      100: '#999',
      200: '#F6F6F6',
      300: '#B7B7B7',
      400: '#AAAAAA',
      500: '#E5E5E5',
      600: '#DDD',
      700: '#808D93',
      800: '#555555',
      900: '#333',
      1000: '#a9afbb',
      1100: '#eee',
      1200: '#e7e7e7',
      1300: '#E2E2E2',
      1400: '#212121',
      1500: '#263238',
      1600: '#E0E0E0',
      1700: '#BABABA',
      1800: '#333333',
      1900: '#A0AEC0',
      2000: '#99999920',
      2100: '#F6F6F6',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('white', 'navy.900')(props),
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
