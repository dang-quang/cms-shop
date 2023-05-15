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

const addVoucherStyle = {
  cardBody: {
    alignItems: 'center',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  text: {
    margin: 0,
    fontSize: '14px',
    color: 'black',
  },
  infoTextPrimary: {
    fontSize: '16px',
    fontWeight: 400,
  },
  infoTextSecondary: {
    color: grayColor[0],
  },
  flex_center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleFormGroup: {
    fontSize: '20px',
    fontWeight: 400,
  },
  labelCell: {
    textAlign: 'right',
  },
  flex_end: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  txtProductName: {
    display: 'block',
    fontSize: '15px !important',
    padding: '0 !important',
    margin: '0 !important',
    marginBottom: '4px !important',
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'pointer',
    '&:hover,&:focus': {
      color: primaryColor[0],
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
  },
  viewItemRight: {
    // with: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // display:  "flex",
    marginBottom: 15,
    with: '30%',
  },
  viewItemLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // display:  "flex",
    marginBottom: 15,
    with: '65%',
  },
  viewItem: {
    display: 'content',
    marginBottom: 20,
  },
  imageForm: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageUpload: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  imageBtn: {
    border: '1px dashed gray',
    marginRight: '0px',
    marginBottom: '10px',
  },
  btnClose: {
    right: '2px',
    top: '2px',
    cursor: 'pointer',
    zIndex: '99',
    color: 'rgba(0, 0, 0, 0.54)',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: '999px',
    '&:hover,&:focus': {
      backgroundColor: '#ededed',
    },
  },
  imgContainer: {
    position: 'relative',
    marginRight: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    marginBottom: 20,
    zIndex: 1,
    position: 'relative',
  },
  box: {
    position: 'absolute',
    cursor: 'pointer',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  buttonCancel: {
    marginRight: 24,
  },
  inputRoot: {
    '&$disabled': {
      color: '#212121',
    },
  },
  disabled: {},
};

export default addVoucherStyle;
