import {blackColor, defaultFont, grayColor, hexToRgb, primaryColor, whiteColor} from "assets/jss/natcash.js";

const smsIndexStyle = {
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
    proInfoContainer: {},
    txtShopName: {
        padding: "0 !important",
        margin: "0 !important",
        color: "#808080 !important",
    },
    actionPopperNav: {
        zIndex: "1",
        top: "auto !important",
        left: "auto !important",
        marginTop: '170px'
    },
    datePopperNav: {
        zIndex: "1",
        top: "auto !important",
        left: "auto !important",
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
export default smsIndexStyle;