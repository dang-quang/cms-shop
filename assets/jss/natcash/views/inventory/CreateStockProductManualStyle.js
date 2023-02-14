import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const CreateStockProductManualStyle = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
  titleFilter: {
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "0",
  },
  marginBottom_20: {
    marginBottom: "20px",
  },
  formControl: {
    width: "100%",
  },
  imageForm: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  imageUpload: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  imageBtn: {
    border: "1px dashed gray",
    marginRight: "0px",
    marginBottom: "10px"
  },
  btnClose:{
    right: "2px",
    top: "2px",
    cursor: "pointer",
    zIndex: "99",
    color: "rgba(0, 0, 0, 0.54)",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "999px",
    "&:hover,&:focus": {
      backgroundColor: "#ededed",
    },
  },
  imgContainer:{
    position: "relative",
    marginRight: "10px",
    marginBottom: "10px"
  }
};
export default CreateStockProductManualStyle;
