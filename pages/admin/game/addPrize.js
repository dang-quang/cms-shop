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

function AddPrize({closeDialog, selectedTab, id}) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const {t} = useTranslation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [values, setValues] = useState({
        code: "",
        name: "",
        prize: "",
        quantity: "",
        amount: "",
        order: "",
        style: "",
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
                    <img src={photo} alt="" key={photo} className={classes.imageUpload} />
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
            const files = Array.from(e.target.files).map((file) =>file);
            setSelectedFiles((prevFiles) => prevFiles.concat(files));
            setSelectedImages((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const handleSubmit = async () => {
        if (_.isEmpty(values.code) || _.isEmpty(values.name) || _.isEmpty(values.prize) ||
            _.isEmpty(values.quantity) || _.isEmpty(values.amount) || _.isEmpty(values.order)
            || _.isEmpty(values.style)) {
            NotificationManager.error({
                title: t('error'),
                message: t('errorInput'),
            });
        } else {
            dispatch(setShowLoader(true));
            const code = values.code;
            const name = values.name;
            const type = selectedTab;
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
                                id="prize"
                                label={t(`game.prize`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.prize,
                                    onChange: handleChangeValue("prize"),
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
                                <InputLabel htmlFor="quantity">
                                    {t(`quantity`)}
                                </InputLabel>
                                <OutlinedInput
                                    id="quantity"
                                    value={values.quantity}
                                    onChange={handleChangeValue("quantity")}
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
                        <GridItem xs={12} sm={6} md={6}>
                            <FormControl
                                fullWidth
                                className={classes.marginBottom_20}
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor="order">
                                    {t(`game.order`)}
                                </InputLabel>
                                <OutlinedInput
                                    id="order"
                                    value={values.order}
                                    onChange={handleChangeValue("order")}
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
                </div>
                <div>
                    <p className={classes.titleFilter}>{t(`game.style`)}</p>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <TextField
                                multiline
                                id="input3"
                                label={t(`game.style`)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                rows={4}
                                inputProps={{
                                    value: values.style,
                                    onChange: handleChangeValue("style"),
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
                            style={{ display: "none" }}
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
                                <PhotoCamera />
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

export default AddPrize;
