import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const shopReviewStyle = {
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
  tabPanel: {
    overflow: "hidden",
    "& > div": {
      padding: "0",
    },
  },
  formControl: {
    width: "100%",
  },
  marginBottom_10: {
    marginBottom: "10px",
  },
  btnFullSize: {
    width: "100%",
  },
  noteTxt: {
    color: "red",
    fontSize: "16px",
    fontWeight: "400"
  },

  proContainer: {
    display: "flex",
    alignItems: "center",
  },
  proFlexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  proInfoContainer: {
    marginLeft: "10px",
  },
  proImg: {
    width: "45px",
    height: "45px",
    padding: "2px",
    borderRadius: 999999,
  },
  shopInfoContainer: {
    display: "flex",
    marginRight: "20px",
  },
  txtshopListing: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#808080 !important",
  },
  txtProductName2: {
    display: "block",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
  },
  icon: {
    fontSize: "18px",
    marginRight: "5px",
    color: "rgb(247, 186, 42)",
  },
  starIcon: {
    color: "rgb(239, 242, 247)",
  },
  btnRep: {
    backgroundColor: "#1890ff !important",
    boxShadow: "none !important",
    width: "unset",
    padding: "8px 15px !important",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    paddingTop: "80px",
  },
  modalContainer: {
    width: "45% !important",
    minWidth: "300px !important",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
  filterEleContent: {
    display: "flex",
  },
  ratingList: {
    padding: 0,
  },
  ratingItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingTitle: {
    margin: "5px 0",
    fontSize: "18px",
    cursor: "pointer",
  },
};
export default shopReviewStyle;
