import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const logisticIndexStyle = {
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
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
  txtOrderCode: {
    display: "block",
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  txtOrderInfo: {
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
  },
  img: {
    width: "60px",
    height: "60px",
    position: "absolute",
    borderRadius: "10px",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardBody: {
    alignItems: "center",
  },
  selectContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover,&:focus": {
      backgroundColor: primaryColor[3],
    },
    marginLeft: "30px",
    padding: "0 10px",
    borderRadius: "4px",
  },
  selectTitleContainer: {
    alignItems: "center",
  },
  txtNumTitle: {
    padding: "0 10px",
    backgroundColor: "#f77927",
    borderRadius: "10px",
    color: "#fff",
    marginLeft: "5px",
  },
  searchContainer: {
    margin: "0 !important",
  },
  btnFilter: {
    marginLeft: "5px",
    fontSize: "20px",
  },
  tableTransition: {
    transition: "height .5s",
  },
  proContainer: {
    display: "flex",
  },
  statusContainer: {
    display: "flex",
    justifyContent: "center",
  },
  proInfoContainer: {},
  proImg: {
    width: "65px",
    height: "65px",
    padding: "2px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "4px",
  },
  iconStatus: {
    marginRight: "5px !important",
  },
  shopImg: {
    width: "15px",
    height: "15px",
    borderRadius: "4px",
    marginRight: "5px",
  },
  shopInfoContainer: {
    display: "flex",
    marginRight: "20px",
  },
  codeIcon: {
    fontSize: "16px",
    marginRight: "5px",
    color: "#808080",
  },
  txtShopName: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#808080 !important",
  },
  txtMoreTypes: {
    padding: "0 !important",
    margin: "0 !important",
    color: primaryColor[0],
  },
  shopInfoMore: {
    "&:hover,&:focus": {
      backgroundColor: primaryColor[3],
    },
    padding: "0 2px",
    borderRadius: "4px",
  },
  txtLienKet: {
    padding: "1px 3px !important",
    margin: "0 !important",
    marginTop: "4px !important",
    borderRadius: "4px",
    border: "0.5px solid #dbdbdb",
    width: "fit-content",
    color: "#808080",
    backgroundColor: "#f5f5f5",
    fontSize: "11px !important",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "40% !important",
    minWidth: "300px !important",
  },
  filterTitleContainer: {
    display: "flex",
    marginLeft: "20px",
  },
  filterEleContent: {
    justifyContent: "space-between",
    borderBottom: "1px solid #D2D2D2",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
  titleFilter: {
    color: primaryColor[0],
  },
  popperNav: {
    zIndex: "1",
    top: "auto !important",
    left: "auto !important",
  },
  popperUpdate: {
    marginTop: "55px",
    zIndex: "9",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: "#fff",
    },
    "&.Mui-selected": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
    "&.Mui-selected:hover": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
  },
  selFilterTitleContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
    marginTop: "15px",
  },
  filteTritle: {
    marginRight: "10px !important",
  },
  select: {
    "&:before": {
      borderColor: "#D2D2D2 !important",
    },
    "&:after": {
      borderColor: primaryColor[0],
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  jC_sb: {
    justifyContent: "space-between",
  },
  btnClose: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    },
  },
  gridAddress: {
    margin: "0 15px !important",
  },
  selectAddressItem: {
    margin: "15px !important",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: "#fff",
    },
  },
  modalSelectAddress: {
    height: "700px",
    overflowY: "auto",
  },
  flex_center_between: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex_center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cursor: {
    cursor: "pointer",
  },
};
export default logisticIndexStyle;
