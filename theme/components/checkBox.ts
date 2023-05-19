export const checkBoxStyles = {
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: 'white',
        },
        control: {
          height: '32px',
          border: '1px',
          borderColor: 'primary.100',
          borderRadius: 'base',
          _disabled: {
            borderColor: 'gray.300',
            bg: 'gray.200',
          },
          _checked: {
            bg: 'primary.100',
            borderColor: 'primary.100',
            _hover: {
              bg: 'primary.100',
              borderColor: 'primary.100',
            },
          },
        },
        label: {
          fontWeight: 'medium',
          color: 'gray.900',
        },
      },
    },
  },
};
