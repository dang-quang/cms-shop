import React, { useEffect, useRef, useState } from 'react';
import { setShowLoader } from '../../../redux/actions/app';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
// layout for this page
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import { FormControl, makeStyles, OutlinedInput, TextField } from '@material-ui/core';
import styles from 'assets/jss/natcash/views/game/addGameStyle';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Close } from '@material-ui/icons';
import { getShopQrDetail, saveGames, savePrizes } from '../../../utilities/ApiManage';
import Router from 'next/router';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Dropdown from '../../../components/Dropdown/dropdown';
import { BASE_API_URL } from 'utilities/const.js';
import useWindowSize from 'components/Hooks/useWindowSize.js';

const initialValues = {
  id: '',
  code: '',
  giftType: '',
  name: '',
  description: '',
  percent: '',
  type: '',
  image: '',
  value: '',
  pointExchange: '',
  quantity: '',
  levels: '',
  alert: '',
};

const typeOptions = [
  {
    title: 'Trả thưởng',
    value: 1,
  },
  {
    title: 'Không trả thưởng',
    value: 2,
  },
];

const giftTypeOptions = [
  {
    title: 'Wallet gift',
    value: 'WALLET_GIFT',
  },
  {
    title: 'Sms gift',
    value: 'SMS_GIFT',
  },
  {
    title: 'Mins gift',
    value: 'MINS_GIFT',
  },
  {
    title: 'Other',
    value: 'OTHER',
  },
];

function addUpdatePrize({ closeDialog, selectedTab, gameId, prize, onUpdated }) {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const size = useWindowSize();
  const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedFiles, setSelectedFiles] = useState([]);

  const game_id = gameId;
  const _prize = prize;

  useEffect(() => {
    dispatch(setShowLoader(true));
    // getShop();
    dispatch(setShowLoader(false));
  }, []);

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <div key={index} className={classes.imgContainer}>
          <Close className={classes.btnClose} onClick={() => handleRemoveImage(photo)} />
          <img src={photo} alt="" key={photo} className={classes.imageUpload} />
        </div>
      );
    });
  };

  const handleRemoveImage = (photo) => {
    const currentIndex = selectedImages.indexOf(photo);
    const newListImages = [...selectedImages];
    //const newListFiles = [...selectedFiles];
    newListImages.splice(currentIndex, 1);
    //newListFiles.splice(currentIndex, 1);
    setSelectedImages(newListImages);
    //setSelectedFiles(newListFiles);
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arr = reader.result.split(',');
        setFieldValue('image', arr[1]);
      };
      reader.readAsDataURL(file);
    }
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      //const files = Array.from(e.target.files).map((file) => file);
      //setSelectedFiles((prevFiles) => prevFiles.concat(files));
      setSelectedImages(filesArray);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const onGetGameDetail = async () => {
    dispatch(setShowLoader(true));
    const res = await getShopQrDetail(game_id);
    dispatch(setShowLoader(false));
    if (res.code === 200) {
    } else {
      NotificationManager.error({
        title: t('error'),
        message: res.message ? res.message.text : 'Error',
      });
    }
  };

  const handleSubmitPrize = async ({
    id,
    code,
    giftType,
    name,
    description,
    percent,
    type,
    image,
    value,
    pointExchange,
    quantity,
    levels,
    alert,
  }) => {
    if (
      _.isEmpty(code) ||
      _.isEmpty(giftType) ||
      _.isEmpty(name) ||
      _.isEmpty(alert) ||
      _.isEmpty(image) ||
      !_.isNumber(type) ||
      !_.isNumber(percent) ||
      !_.isNumber(value) ||
      !_.isNumber(quantity) ||
      !_.isNumber(levels)
    ) {
      NotificationManager.error({
        title: t('error'),
        message: t('errorInput'),
      });
    } else {
      dispatch(setShowLoader(true));

      if (_prize) {
        const res = await savePrizes({
          id: id,
          gameId: game_id,
          code: code,
          giftType: giftType,
          name: name,
          description: description,
          percent: percent,
          type: type,
          image: image,
          value: value,
          pointExchange: pointExchange,
          quantity: quantity,
          levels: levels,
          alert: alert,
        });
        dispatch(setShowLoader(false));
        if (res.code === 'MSG_SUCCESS') {
          Router.push('/admin/game');
          onUpdated();
        } else {
          NotificationManager.error({
            title: t('error'),
            message: res.message ? res.message.text : 'Error',
          });
        }
        closeDialog();
      } else {
        const res = await savePrizes({
          gameId: game_id,
          code: code,
          giftType: giftType,
          name: name,
          description: description,
          percent: percent,
          type: type,
          image: image,
          value: value,
          pointExchange: pointExchange,
          quantity: quantity,
          levels: levels,
          alert: alert,
        });

        dispatch(setShowLoader(false));
        if (res.code === 200) {
          Router.push('/admin/game');
        } else {
          NotificationManager.error({
            title: t('error'),
            message: res.message ? res.message.text : 'Error',
          });
        }
        closeDialog();
      }
    }
  };

  // TODO validation schema message
  const addUpdatePrizeValidationSchema = yup.object().shape({
    code: yup.string().required(t('errorInput')),
    giftType: yup.string().required(t('errorInput')),
    name: yup.string().required(t('errorInput')),
    percent: yup.string().required(t('errorInput')),
    type: yup.string().required(t('errorInput')),
    value: yup.string().required(t('errorInput')),
    pointExchange: yup.string().required(t('errorInput')),
    quantity: yup.string().required(t('errorInput')),
    levels: yup.string().required(t('errorInput')),
    alert: yup.string().required(t('errorInput')),
    description: yup.string().required(t('errorInput')),
  });

  return (
    <Formik
      //validationSchema={addUpdatePrizeValidationSchema}
      enableReinitialize={true}
      initialValues={prize ? prize : initialValues}
      onSubmit={handleSubmitPrize}>
      {({ handleChange, handleSubmit, setFieldValue, values }) => {
        React.useEffect(() => {
          if (_prize) {
            const str = BASE_API_URL + '/assets/' + values.image;

            setSelectedImages([str]);

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = str;
            img.onload = async () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/png');

              setFieldValue('image', dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
            };
          }
        }, [_prize]);
        return (
          <div
            style={{
              height: window.innerHeight - 150 + 'px',
              overflowY: 'auto',
            }}>
            <Card className={classes.noMargin}>
              <CardBody className={classes.cardBody}>
                <div>
                  <p className={classes.titleFilter}>{t('basicInformation')}</p>
                  <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                      <TextField
                        id="code"
                        label={t(`category.code`)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                          value: values.code,
                          onChange: handleChange('code'),
                        }}
                        className={classes.marginBottom_20}
                        autoComplete="off"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={8} md={8}>
                      {/* <TextField
                      id="giftType"
                      label={`giftType`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      inputProps={{
                        value: values.giftType,
                        onChange: handleChange('giftType'),
                      }}
                      className={classes.marginBottom_20}
                      autoComplete="off"
                    /> */}
                      <div className={classes.marginBottom_20}>
                        <Dropdown
                          title="giftType"
                          options={giftTypeOptions}
                          value={values.giftType}
                          handleOnChange={handleChange('giftType')}
                          className={classes.marginBottom_20}
                        />
                      </div>
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
                        onChange={handleChange('name')}
                        className={classes.marginBottom_20}
                        autoComplete="off"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControl
                        fullWidth
                        className={classes.marginBottom_20}
                        variant="outlined"
                        size="small">
                        <InputLabel htmlFor="percent">{'percent'}</InputLabel>
                        <OutlinedInput
                          id="percent"
                          value={values.percent}
                          onChange={handleChange('percent')}
                          startAdornment={<InputAdornment position="start">%</InputAdornment>}
                          labelWidth={70}
                          type="number"
                          autoComplete="off"
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      {/* <FormControl
                      fullWidth
                      className={classes.marginBottom_20}
                      variant="outlined"
                      size="small">
                      <InputLabel htmlFor="type">{'type'}</InputLabel>
                      <OutlinedInput
                        id="type"
                        value={values.type}
                        onChange={handleChange('type')}
                        // startAdornment={
                        //     <InputAdornment position="start">1</InputAdornment>
                        // }
                        labelWidth={70}
                        type="number"
                        autoComplete="off"
                      />
                    </FormControl> */}
                      <div className={classes.marginBottom_20}>
                        <Dropdown
                          title="type"
                          options={typeOptions}
                          value={values.type}
                          handleOnChange={handleChange('type')}
                        />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControl
                        fullWidth
                        className={classes.marginBottom_20}
                        variant="outlined"
                        size="small">
                        <InputLabel htmlFor="value">{'value'}</InputLabel>
                        <OutlinedInput
                          id="value"
                          value={values.value}
                          onChange={handleChange('value')}
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
                        size="small">
                        <InputLabel htmlFor="pointExchange">{'pointExchange'}</InputLabel>
                        <OutlinedInput
                          id="pointExchange"
                          value={values.pointExchange}
                          onChange={handleChange('pointExchange')}
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
                        size="small">
                        <InputLabel htmlFor="quantity">{'quantity'}</InputLabel>
                        <OutlinedInput
                          id="quantity"
                          value={values.quantity}
                          onChange={handleChange('quantity')}
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
                        size="small">
                        <InputLabel htmlFor="levels">{'levels'}</InputLabel>
                        <OutlinedInput
                          id="levels"
                          value={values.levels}
                          onChange={handleChange('levels')}
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
                        size="small">
                        <InputLabel htmlFor="alert">{'alert'}</InputLabel>
                        <OutlinedInput
                          id="alert"
                          value={values.alert}
                          onChange={handleChange('alert')}
                          // startAdornment={
                          //     <InputAdornment position="start">₫</InputAdornment>
                          // }
                          labelWidth={70}
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
                          onChange: handleChange('description'),
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
                    {selectedImages.length > 0 ? (
                      renderPhotos(selectedImages)
                    ) : (
                      <>
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                        />
                        <label
                          htmlFor="icon-button-file"
                          className={classes.imageUpload + ' ' + classes.imageBtn}>
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </>
                    )}
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
          </div>
        );
      }}
    </Formik>
  );
}

export default addUpdatePrize;
