import {blackColor, defaultFont, grayColor, hexToRgb, primaryColor, whiteColor} from "assets/jss/natcash.js";

const gameIndexStyle = {
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
    sideBarContainer: {
        display: 'flex',
        alignSelf: 'start',
        width: '12vw',
        // backgroundColor: primaryColor[0],
        height: '500px'
    },
    itemText: {
        ...defaultFont,
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: blackColor,
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "0 5px",
        borderRadius: "3px",
        position: "relative",
        display: "flex",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont,
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: whiteColor,
        },
    },
    white: {
        backgroundColor: primaryColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(primaryColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(primaryColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: primaryColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(primaryColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(primaryColor[0]) +
                ",.2)",
        },
        "& $itemText": {
            color: grayColor[8],
        },
        "& $itemIcon": {
            color: "rgba(" + hexToRgb(grayColor[8]) + ", 0.8)",
        },
    },
    whiteFont: {
        color: '#fff !important',
    },
    listContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    gameImage: {
        width: '80px',
        height: '80px',
        objectFit: 'contain'
    }
};
export default gameIndexStyle;
