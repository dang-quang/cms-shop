export const checkBoxStyles = {
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: 'white',
        },
        control: {
          h: '32px',
          w: '32px',
          bg: 'bg-1',
          borderWidth: '1px',
          borderColor: 'border-5',
          borderRadius: 'base',
          _disabled: {
            borderColor: 'gray.300',
            bg: 'gray.200',
            _checked: {
              bg: 'primary.100',
              borderWidth: '1px',
              borderColor: 'primary.100',
              _hover: {
                bg: 'primary.100',
                borderColor: 'primary.100',
              },
            },
          },
          _checked: {
            bg: 'primary.100',
            borderWidth: '1px',
            borderColor: 'primary.100',
            _hover: {
              bg: 'primary.100',
              borderColor: 'primary.100',
            },
          },
          _focus: { shadow: 'none' },
          _hover: {
            borderColor: 'primary.100',
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
