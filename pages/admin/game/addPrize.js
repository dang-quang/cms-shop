import React, { useEffect, useState } from "react";
import { setShowLoader } from "../../../redux/actions/app";
import { useDispatch } from "react-redux";
import { NotificationManager, } from "react-light-notifications";
import "react-light-notifications/lib/main.css";
// @material-ui/core components
// layout for this page
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { FormControl, makeStyles, OutlinedInput, TextField, } from "@material-ui/core";
import styles from "assets/jss/natcash/views/game/addGameStyle";
import { useTranslation } from "react-i18next";
import _ from 'lodash';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Close } from "@material-ui/icons";
import { getShopQrDetail, saveGames, savePrizes } from "../../../utilities/ApiManage";
import Router from "next/router";

function AddPrize({ closeDialog, selectedTab, id }) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [base64Image, setBase64Image] = useState('');
    const [values, setValues] = useState({
        code: "",
        giftType:"",
        name: "",
        description:"",
        percent: "", 
        type: "",
        image:"",
        value:"",
        pointExchange:"",
        gameId: id,
        quantity: "",
    });
    const handleChangeValue = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
                    <Close className={classes.btnClose} onClick={() => handleRemoveImage(photo)} />
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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const arr = reader.result.split(",");
                setBase64Image(arr[1]);
            };
            reader.readAsDataURL(file);
        }
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

        console.log('values.code', values.code)
        // if (_.isEmpty(values.code) || _.isEmpty(values.name) || _.isEmpty(values.prize) ||
        //     _.isEmpty(values.quantity) || _.isEmpty(values.amount) || _.isEmpty(values.order)) {
        //     NotificationManager.error({
        //         title: t('error'),
        //         message: t('errorInput'),
        //     });
        // } else {
            dispatch(setShowLoader(true));
            const code = values.code;
            const giftType = values.giftType;
            const name = values.name;
            const description = values.description;
            const percent= values.percent; 
            const type= 1;
            const image=base64Image;
            const pointExchange= 3.3;
            const gameId= id;
            const quantity= 100;
            const res = await savePrizes(
                {
                    code: code,
                    giftType: giftType,
                    name: name,
                    description: description,
                    percent: percent, 
                    type: 1,
                    image:base64Image,
                    value: 4.4,
                    pointExchange: 3.3,
                    gameId: id,
                    quantity: 100,
                }
            );
            console.log('savePrizes==>',  res);
            dispatch(setShowLoader(false));
            // if (res.code === 200) {
            //     Router.push("/admin/game");
            // } else {
            //     NotificationManager.error({
            //         title: t('error'),
            //         message: res.message ? res.message.text : "Error",
            //     });
            // }
            // closeDialog();
        // }
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
                                id="giftType"
                                label={`giftType`}
                                variant="outlined"
                                size="small"
                                fullWidth
                                inputProps={{
                                    value: values.giftType,
                                    onChange: handleChangeValue("giftType"),
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
                                id="name"
                                label={`name`}
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={values.name}
                                onChange={handleChangeValue("name")}
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
                                <InputLabel htmlFor="percent">
                                    {'percent'}
                                </InputLabel>
                                <OutlinedInput
                                    id="percent"
                                    value={values.percent}
                                    onChange={handleChangeValue("percent")}
                                    startAdornment={
                                        <InputAdornment position="start">%</InputAdornment>
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
                                <InputLabel htmlFor="type">
                                    {'type'}
                                </InputLabel>
                                <OutlinedInput
                                    id="type"
                                    value={values.type}
                                    onChange={handleChangeValue("type")}
                                    // startAdornment={
                                    //     <InputAdornment position="start">1</InputAdornment>
                                    // }
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
                                <InputLabel htmlFor="value">
                                    {'value'}
                                </InputLabel>
                                <OutlinedInput
                                    id="value"
                                    value={values.value}
                                    onChange={handleChangeValue("value")}
                                    // startAdornment={
                                    //     <InputAdornment position="start">₫</InputAdornment>
                                    // }
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
                                <InputLabel htmlFor="pointExchange">
                                    {'pointExchange'}
                                </InputLabel>
                                <OutlinedInput
                                    id="pointExchange"
                                    value={values.pointExchange}
                                    onChange={handleChangeValue("pointExchange")}
                                    // startAdornment={
                                    //     <InputAdornment position="start">1</InputAdornment>
                                    // }
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
                                <InputLabel htmlFor="quantity">
                                    {'quantity'}
                                </InputLabel>
                                <OutlinedInput
                                    id="quantity"
                                    value={values.quantity}
                                    onChange={handleChangeValue("quantity")}
                                    // startAdornment={
                                    //     <InputAdornment position="start">₫</InputAdornment>
                                    // }
                                    labelWidth={70}
                                    type="number"
                                    autoComplete="off"
                                />
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </div>
                <div>
                    <p className={classes.titleFilter}>{'description'}</p>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <TextField
                                multiline
                                id="input3"
                                label={'description'}
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
