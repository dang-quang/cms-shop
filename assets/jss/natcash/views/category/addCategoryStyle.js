const addCategoryStyle = {
  cardBody: {
    alignItems: 'center',
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
  flex_center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  formCell: {
    maxWidth: '80%',
  },
  flex_column: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex_end: {
    display: 'flex',
    justifyContent: 'end !important',
  },
  infoText: {
    borderRight: '1px solid #808080',
    paddingRight: '8px',
  },
  imageForm: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageUpload: {
    width: '150px',
    height: '150px',
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
  },
};

export default addCategoryStyle;
