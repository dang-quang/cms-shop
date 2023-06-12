export const menuStyles = {
  components: {
    Menu: {
      bg: 'red',
      baseStyle: {
        bg: 'blue',
        _focus: {
          border: '1x solid red', // neither of these modify the MenuItem's base _focus style
        },
      },
    },
  },
};
