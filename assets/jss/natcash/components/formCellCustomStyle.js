import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from 'assets/jss/natcash.js';

const formCellCustomStyle = {
  text: {
    margin: 0,
    color: '#000000',
    textAlign: 'right',
  },
  infoTextPrimary: {
    fontSize: '16px',
    fontWeight: 400,
  },
  infoTextSecondary: {
    color: grayColor[0],
  },
  formCellContainer: {
    marginBottom: '24px',
  },
  labelCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: '100%',
  },
  helperTextCustom: {
    color: grayColor[0],
    fontWeight: 400,
  },
};

export default formCellCustomStyle;
