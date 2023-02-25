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

function AddGame({cancelFunc, confirmFunc, selectedTab}) {
    const dispatch = useDispatch();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const {t} = useTranslation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [values, setValues] = React.useState({
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

    const handelSubmit = async () => {
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
                                    onChange: (e) => handleChangeValue("code", e.target.value),
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
                                    onChange: (e) => handleChangeValue("name", e.target.value),
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
                                    onChange: (e) => handleChangeValue("prize", e.target.value),
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
                                    onChange={(e) => handleChangeValue("quantity", e.target.value)}
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
                                    onChange={(e) => handleChangeValue("amount", e.target.value)}
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
                                    onChange={(e) => handleChangeValue("order", e.target.value)}
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
                                    onChange: (e) => handleChangeValue("style", e.target.value),
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
                <Button color="gray" onClick={() => cancelFunc()}>
                    {t('cancel')}
                </Button>
                <Button color="primary" onClick={() => handelSubmit()}>
                    {t('confirm')}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AddGame;
