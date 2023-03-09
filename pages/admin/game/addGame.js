import React, {useEffect, useState} from "react";
import {setShowLoader} from "../../../redux/actions/app";
import {useDispatch} from "react-redux";
import {NotificationManager,} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
// @material-ui/core components
// layout for this page
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import {FormControl, makeStyles, OutlinedInput, TextField,} from "@material-ui/core";
import styles from "assets/jss/natcash/views/game/addGameStyle";
import {useTranslation} from "react-i18next";
import _ from 'lodash';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {Close} from "@material-ui/icons";
import {getShopQrDetail, saveGames} from "../../../utilities/ApiManage";
import Router from "next/router";
import {grayColor} from "../../../assets/jss/natcash";
import FormCellCustom from "../../../components/FormCustom/FormCellCustom";
import moment from "moment/moment";

function AddGame({closeDialog, selectedTab}) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const {t} = useTranslation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [values, setValues] = useState({
        code: "",
        name: "",
        type: "",
        time_from: moment().format("yyyy-MM-DDThh:mm"),
        time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
        description: "",
        image: "",
        amount: ""
    });
    const handleChangeValue = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


    useEffect(() => {
        dispatch(setShowLoader(true));
        // getShop();
        dispatch(setShowLoader(false));
    }, []);

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return (
                <div className={classes.imgContainer}>
                    <Close className={classes.btnClose} onClick={() => handleRemoveImage(photo)}/>
                    <img src={photo} alt="" key={photo} className={classes.imageUpload}/>
                </div>
            );
        });
    };
    const handleRemoveImage = (photo) => {
        const currentIndex = selectedImages.indexOf(photo);
        const newListImages = [...selectedImages];
        const newListFiles = [...selectedFiles];
        newListImages.splice(currentIndex, 1);
        newListFiles.splice(currentIndex, 1);
        setSelectedImages(newListImages)
        setSelectedFiles(newListFiles)
    }
    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            const files = Array.from(e.target.files).map((file) => file);
            setSelectedFiles((prevFiles) => prevFiles.concat(files));
            setSelectedImages((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const handleSubmit = async () => {
        if (_.isEmpty(values.code) || _.isEmpty(values.name) || _.isEmpty(values.type) ||
            _.isEmpty(values.startTime) || _.isEmpty(values.endTime) || _.isEmpty(values.description)
            || _.isEmpty(values.image) || _.isEmpty(values.amount)) {
            NotificationManager.error({
                title: t('error'),
                message: t('errorInput'),
            });
        } else {
            dispatch(setShowLoader(true));
            const code = values.code;
            const name = values.name;
            const type = values.type;
            const startTime = "16/02/2023 00:00:00";
            const endTime = "22/02/2023 00:00:00";
            const description = "Lucky Wheel";
            const image = "";
            const amount = 100000;
            const res = await saveGames(code, name, type, startTime, endTime, description, image, amount);
            dispatch(setShowLoader(false));
            if (res.code === 200) {
                Router.push("/admin/game");
            } else {
                NotificationManager.error({
                    title: t('error'),
                    message: res.message ? res.message.text : "Error",
                });
            }
            closeDialog();
        }
    };

    const onGetGameDetail = async () => {
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

    return (
        <Card className={classes.noMargin}>
            <CardBody className={classes.cardBody}>
                <div>
                    <p className={classes.titleFilter}>{t('basicInformation')}</p>
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <TextField
                                // error={validateSku ? false : true}
                                id="code"
                                label={t(`category.code`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.code,
                                    onChange: handleChangeValue("code"),
                                }}
                                className={classes.marginBottom_20}
                                autoComplete="off"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={8} md={8}>
                            <TextField
                                id="name"
                                label={t(`name`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.name,
                                    onChange: handleChangeValue("name"),
                                }}
                                className={classes.marginBottom_20}
                                autoComplete="off"
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                            <TextField
                                // error={validateSku ? false : true}
                                id="type"
                                label={t(`voucher.type`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.type,
                                    onChange: handleChangeValue("type"),
                                }}
                                className={classes.marginBottom_20}
                                autoComplete="off"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                            <FormControl
                                fullWidth
                                className={classes.marginBottom_20}
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor="amount">
                                    {t(`amount`)}
                                </InputLabel>
                                <OutlinedInput
                                    id="amount"
                                    value={values.amount}
                                    onChange={handleChangeValue("amount")}
                                    startAdornment={
                                        <InputAdornment position="start">₫</InputAdornment>
                                    }
                                    labelWidth={70}
                                    type="number"
                                    autoComplete="off"
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} style={{marginTop: '15px'}}>
                            <FormCellCustom
                                label={t('time')}
                                // helperText={t('voucher.timeDes')}
                            >
                                <div className={classes.formCell + " " + classes.flex_center}>
                                    <TextField
                                        id="datetime-local"
                                        // label="Next appointment"
                                        type="datetime-local"
                                        value={values.time_from}
                                        onChange={handleChangeValue("time_from")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <span
                                        style={{
                                            margin: "0 15px",
                                            width: "15px",
                                            height: "2px",
                                            backgroundColor: grayColor[0],
                                            display: "block",
                                        }}
                                    ></span>
                                    <TextField
                                        id="datetime-local"
                                        // label="Next appointment"
                                        type="datetime-local"
                                        value={values.time_to}
                                        onChange={handleChangeValue("time_to")}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </FormCellCustom>
                        </GridItem>
                    </GridContainer>
                </div>
                <div>
                    <p className={classes.titleFilter}>{t(`description`)}</p>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <TextField
                                multiline
                                id="input3"
                                label={t(`description`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                rows={4}
                                inputProps={{
                                    value: values.description,
                                    onChange: handleChangeValue("description"),
                                }}
                                className={classes.marginBottom_20}
                                autoComplete="off"
                            />
                        </GridItem>
                    </GridContainer>
                </div>
                <div>
                    <p className={classes.titleFilter}>{t(`game.image`)}</p>
                    <div className={classes.imageForm}>
                        {renderPhotos(selectedImages)}
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            multiple
                            style={{display: "none"}}
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="icon-button-file"
                            className={classes.imageUpload + " " + classes.imageBtn}
                        >
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                    </div>
                </div>
            </CardBody>
            <CardFooter className={classes.flex_end}>
                <Button color="gray" onClick={() => closeDialog()}>
                    {t('cancel')}
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                    {t('confirm')}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AddGame;
