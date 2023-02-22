import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "assets/jss/natcash.js";

const tableStyle = (theme) => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    minWidth: "800px",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em",
    },
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableScroll: {
    overflow: "auto",
    maxHeight: "400px",
  },
  tableCustom: {
    border: "1px solid #e5e5e5",
  },
  tableHeadCustom: {
    backgroundColor: "#f6f6f6",
  },
  cellWidth_400: {
    width: "400px",
  },
  cellWidth_200: {
    width: "200px",
  },
  tableScrollModal:{
    maxHeight: 350,
    overflow: "auto",
  },
  paginationContainer:{
    paddingTop: 10,
    borderTop: `1px solid ${primaryColor[0]} !important`
  },
  flex_center_between: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtOrderInfo: {
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
  },
});

export default tableStyle;
