export const menuStyles = {
  components: {
    Menu: {
      baseStyle: {
        list: {
          shadow: 'lg',
        },
        item: {
          color: 'text-basic',
          _hover: {
            color: 'primary.100',
            fontWeight: '500',
          },
          _focus: {
            outline: 'none',
            background: 'gray.200',
          },
        },
      },
    },
  },
};
