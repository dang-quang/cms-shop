import React, {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {setShowLoader} from "../../../redux/actions/app";
import {useDispatch} from "react-redux";
import moment from "moment";
import {NotificationContainer, NotificationManager,} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
// @material-ui/core components
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import {FormControl, FormControlLabel, makeStyles, Radio, RadioGroup, TextField, withStyles,} from "@material-ui/core";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import FormGroupCustom from "components/FormCustom/FormGroupCustom.js";
import FormCellCustom from "components/FormCustom/FormCellCustom.js";
import styles from "assets/jss/natcash/views/qrshop/addQrStyle";
import {useTranslation} from "react-i18next";
import QRCode from 'qrcode.react';
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {Autocomplete} from "@material-ui/lab";
import {getShopQrDetail, saveShopQr} from "../../../utilities/ApiManage";

const listShop = [
    {
        code: 'NT1',
        name: 'Natcom Net 1'
    }, {
        code: 'NT2',
        name: 'Natcom Net 2'
    }, {
        code: 'NT3',
        name: 'Natcom Net 3'
    }, {
        code: 'NT4',
        name: 'Natcom Net 4'
    }, {
        code: 'NT5',
        name: 'Natcom Net 5'
    }, {
        code: 'NT6',
        name: 'Natcom Net 6'
    },
]

function ShopQrDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [selectedShop, setSelectedShop] = useState();
    const [qrStatus, setQrStatus] = useState("");
    // const [values, setValues] = React.useState({
    //     shop_id: "",
    //     shopName: "",
    //     qrStatus: null
    // });

    const {t} = useTranslation();


    const CustomRadio = withStyles({
        root: {
            color: "gray",
            "&$checked": {
                color: "#f96606",
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);


    useEffect(() => {
        dispatch(setShowLoader(true));
        // getShop();
        dispatch(setShowLoader(false));
    }, []);

    const onGetQrDetail = async () => {
        if (!id) {
            NotificationManager.error({
                title: t('error'),
                message: t('netError'),
            });
        } else {
            dispatch(setShowLoader(true));
            const res = await getShopQrDetail(id);
            dispatch(setShowLoader(false));
            if (res.code === 200) {
            } else {
                NotificationManager.error({
                    title: t('error'),
                    message: res.message ? res.message.text : "Error",
                });
            }
        }
    }

    const handleSubmit = async () => {
        if (!selectedShop) {
            // validate shop
            NotificationManager.error({
                title: t('error'),
                message: t('qrManagement.invalidShop'),
            });
        } else if (qrStatus === '') {
            // validate promotion products
            NotificationManager.error({
                title: t('error'),
                message: t('qrManagement.emptyStatus'),
            });
        } else {
            dispatch(setShowLoader(true));
            const code = selectedShop.code;
            const name = selectedShop.name;
            const type = "Net";
            const description = "Natcom Net 4G 1G";
            const image = "";
            const value = 100000;
            const pointExchange = 10;
            const status = qrStatus === "active" ? 0 : 1;
            const res = await saveShopQr(code, name, type, description, image, value, pointExchange, status);
            dispatch(setShowLoader(false));
            if (res.code === 200) {
                Router.push("/admin/qrManagement");
            } else {
                NotificationManager.error({
                    title: t('error'),
                    message: res.message ? res.message.text : "Error",
                });
            }
            // Router.push("/admin/qrManagement");
        }
    };

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{t('qrManagement.createQr')}</h4>
            </CardHeader>
            <CardBody className={classes.cardBody}>
                {/* Basic information */}
                <FormGroupCustom title={t('basicInformation')}>
                    <FormCellCustom
                        label={t('qrManagement.qrCode')}
                    >
                        <div className={classes.qrGradient}>
                            <div className={classes.qrContainer}>
                                <QRCode
                                    id='qrcode'
                                    value={'https://www.facebook.com/huutung.09/'}
                                    // includeMargin={true}
                                    size={110}
                                    level={'L'}
                                    imageSettings={{
                                        excavate: true,
                                    }}
                                />
                            </div>
                        </div>
                    </FormCellCustom>
                    {/* Combo Name */}
                    <FormCellCustom
                        label={t('sideBar.shop')}
                        helperText={t('qrManagement.description')}
                    >
                        <div className={classes.formCell}>
                            {/*<TextField*/}
                            {/*    //   error={validateItemName ? false : true}*/}
                            {/*    id="input1"*/}
                            {/*    label={""}*/}
                            {/*    variant="outlined"*/}
                            {/*    size="small"*/}
                            {/*    fullWidth*/}
                            {/*    inputProps={{*/}
                            {/*        value: values.shopName,*/}
                            {/*        onChange: handleChangeValue("shopName"),*/}
                            {/*    }}*/}
                            {/*    placeholder={t('notSet')}*/}
                            {/*    autoComplete="off"*/}
                            {/*/>*/}
                            <Autocomplete
                                limitTags={2}
                                size="small"
                                options={listShop}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => {
                                    setSelectedShop(value)
                                }}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <div style={{ alignItems: "center" }}>
                                            <p style={{ fontSize: "15px", margin: 0 }}>{option.name}</p>
                                            {/*<p className={classes.txtMemberSelect}>{"@" + option.email.split("@")[0]}</p>*/}
                                        </div>
                                    </React.Fragment>
                                )}
                                style={{ margin: "10px 0px" }}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={"Shop"} placeholder={"Add Shop"} />
                                )}
                            />
                        </div>
                    </FormCellCustom>
                    <FormCellCustom label={t('status')} helperText={""}>
                        <div className={classes.formCell}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="shop"
                                    name="shop1"
                                    value={qrStatus}
                                    onChange={event => setQrStatus(event.target.value)}
                                    className={classes.flex_center}
                                >
                                    <FormControlLabel
                                        value={"active"}
                                        control={<CustomRadio/>}
                                        label={t('qrManagement.active')}
                                    />
                                    <FormControlLabel
                                        value={"notActive"}
                                        control={<CustomRadio/>}
                                        label={t('qrManagement.notActive')}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </FormCellCustom>
                </FormGroupCustom>
                <NotificationContainer/>
            </CardBody>
            <CardFooter className={classes.flex_end}>
                <Button color="gray" onClick={() => Router.back()}>
                    {t('cancel')}
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                    {t('confirm')}
                </Button>
            </CardFooter>
        </Card>
    );
}

ShopQrDetailPage.layout = Admin;

export default WithAuthentication(ShopQrDetailPage);
