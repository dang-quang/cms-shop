const addGameStyle = {
    cardBody: {
        alignItems: "center",
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
    flex_center: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    formCell: {
        maxWidth: "80%",
    },
    flex_column: {
        display: "flex",
        flexDirection: "column",
    },
    flex_row: {
        display: "flex",
        flexDirection: "row",
    },
    flex_end: {
        display: "flex",
        justifyContent: "end !important",
    },
    textField: {
        margin: 0,
        fontWeight: 400,
    },
    qrGradient: {
        background: 'conic-gradient(from 180deg at 50% 50%, #EE4019 0deg, #ED5E0D 125.21deg, #F68920 245.21deg, #FF9900 360deg)',
        width: '130px',
        height: '130px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        alignSelf: 'center',
        marginLeft: '15vw'
    },
    qrContainer: {
        backgroundColor: 'white',
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
    },
    infoText: {
        borderRight: '1px solid #808080',
        paddingRight: '8px'
    },
    noMargin: {
        margin: '0px !important'
    },
    titleFilter: {
        fontSize: "16px",
        fontWeight: "500",
        marginTop: "0",
    },
    marginBottom_20: {
        marginBottom: "20px",
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

export default addGameStyle;
