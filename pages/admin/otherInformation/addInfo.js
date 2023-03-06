import React, {useEffect, useState} from "react";
import Router from "next/router";
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
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import {
    FormControl,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    withStyles,
} from "@material-ui/core";
import FormGroupCustom from "components/FormCustom/FormGroupCustom.js";
import FormCellCustom from "components/FormCustom/FormCellCustom.js";
import styles from "assets/jss/natcash/views/otherInfo/addInfoStyle";
import {useTranslation} from "react-i18next";
import _ from 'lodash';
import {Autocomplete} from "@material-ui/lab";

const listShop = [
    {
        id: '1',
        name: 'Nat shop'
    }, {
        id: '2',
        name: 'Second shop'
    }, {
        id: '3',
        name: 'Third shop'
    }, {
        id: '4',
        name: 'Four shop'
    }, {
        id: '5',
        name: 'Five shop'
    }, {
        id: '6',
        name: 'Six shop'
    },
]

function AddInformation({cancelFunc, confirmFunc, selectedTab}) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = React.useState({
        infoCode: "",
        infoName: "",
        status: "",
    });
    const handleChangeValue = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


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


    const handleSubmit = async () => {
        if (_.isEmpty(values.infoCode) || _.isEmpty(values.infoName) || _.isEmpty(values.status)) {
            // validate shop
            NotificationManager.error({
                title: t('error'),
                message: t('errorInput'),
            });
        } else {
            // dispatch(setShowLoader(true));
            // let res = await createNewPromotionMarketing(values);
            // dispatch(setShowLoader(false));
            // if (res.code === 200) {
            //     Router.push("/admin/promotion");
            // } else {
            //     NotificationManager.error({
            //         title: t('error'),
            //         message: res.message ? res.message.text : "Error",
            //     });
            // }
            confirmFunc();
        }
    };

    return (
        <Card className={classes.noMargin}>
            <CardBody className={classes.cardBody}>
                <FormGroupCustom title={t('basicInformation')}>
                    <FormCellCustom
                        label={t(`category.code`)}
                        helperText={t(`category.code`)}>
                        <div className={classes.formCell}>
                            <TextField
                                label={""}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.infoCode,
                                    onChange: handleChangeValue("infoCode"),
                                }}
                                placeholder={t('enterHere')}
                                autoComplete="off"
                            />
                        </div>
                    </FormCellCustom>
                    <FormCellCustom
                        label={t(`name`)}
                        helperText={t(`name`)}>
                        <div className={classes.formCell}>
                            <TextField
                                label={""}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.infoName,
                                    onChange: handleChangeValue("infoName"),
                                }}
                                placeholder={t('enterHere')}
                                autoComplete="off"
                            />
                        </div>
                    </FormCellCustom>
                    <FormCellCustom
                        label={t('category.parent')}
                        helperText={t('category.parentCategoryCodeDes')}
                    >
                        <div className={classes.formCell}>
                            <Autocomplete
                                limitTags={2}
                                size="small"
                                options={listShop}
                                getOptionLabel={(option) => option.name}
                                onChange={handleChangeValue("parentCategoryCode")}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <div style={{alignItems: "center"}}>
                                            <p style={{fontSize: "15px", margin: 0}}>{option.name}</p>
                                            {/*<p className={classes.txtMemberSelect}>{"@" + option.email.split("@")[0]}</p>*/}
                                        </div>
                                    </React.Fragment>
                                )}
                                style={{margin: "10px 0px"}}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={t('category.parent')} placeholder={t('notSet')}/>
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
                                    value={values.promotion}
                                    onChange={handleChangeValue("status")}
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
                <Button color="gray" onClick={() => cancelFunc()}>
                    {t('cancel')}
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                    {t('confirm')}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AddInformation;
