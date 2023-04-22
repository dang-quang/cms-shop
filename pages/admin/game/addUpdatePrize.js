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
import {
  FormControl,
  FormHelperText,
  makeStyles,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import styles from 'assets/jss/natcash/views/game/addGameStyle';
import { useTranslation } from 'react-i18next';
import _, { isEmpty } from 'lodash';
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
    title: 'Data gift',
    value: 'DATA_GIFT',
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

const codeOptions = {
  WALLET_GIFT: [
    { title: 'LK10KMON', value: 'LK10KMON' },
    { title: 'LK1KMON', value: 'LK1KMON' },
    { title: 'LK500MON', value: 'LK500MON' },
    { title: 'LK100MON', value: 'LK100MON' },
  ],
  SMS_GIFT: [{ title: 'LK10SMS', value: 'LK10SMS' }],
  DATA_GIFT: [
    { title: 'LK50MB', value: 'LK50MB' },
    { title: 'LK100MB', value: 'LK100MB' },
    { title: 'LK500MB', value: 'LK500MB' },
    { title: 'LK1GB', value: 'LK1GB' },
  ],
  MINS_GIFT: [{ title: 'LK3MIN', value: 'LK3MIN' }],
  OTHER: [{ title: 'OTHER', value: 'OTHER' }],
};

const valueOptions = {
  LK10KMON: 10000,
  LK1KMON: 1000,
  LK500MON: 500,
  LK100MON: 100,
  LK10SMS: 10,
  LK50MB: 50,
  LK100MB: 100,
  LK500MB: 500,
  LK1GB: 1,
  LK3MIN: 3,
  OTHER: 1,
};

function addUpdatePrize({ closeDialog, gameId, prize, onUpdated }) {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const size = useWindowSize();
  const [selectedImages, setSelectedImages] = useState([]);

  const game_id = gameId;
  const _prize = prize;

  useEffect(() => {
    dispatch(setShowLoader(true));
    // getShop();
    dispatch(setShowLoader(false));
  }, []);

  const handleRemoveImage = (photo, setFieldValue) => {
    const currentIndex = selectedImages.indexOf(photo);
    const newListImages = [...selectedImages];
    newListImages.splice(currentIndex, 1);
    setSelectedImages(newListImages);
    setFieldValue('image', '');
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
  };
  //Todo Validation Schema
  const addUpdatePrizeValidationSchema = yup.object().shape({
    giftType: yup.string().required(t('errorGiftTypeRequire')),
    code: yup.string().required(t('errorCodeRequire')),
    name: yup.string().required(t('errorNameRequire')),
    percent: yup
      .string()
      .required(t('errorPercentRequire'))
      .matches(/^\d+(\.\d+)?$/, t('errorInvalid'))
      .test('maxPercent', t('errorPercentMax'), function (value) {
        return parseFloat(value) <= 100;
      }),
    type: yup.string().required(t('errorTypeRequire')),
    value: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, t('errorInvalid'))
      .required(t('errorValueRequire')),
    quantity: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, t('errorInvalid'))
      .required(t('errorQuantityRequire')),
    levels: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, t('errorInvalid'))
      .required(t('errorLevelsRequire')),
    alert: yup.string().required(t('errorAlertRequire')),
    pointExchange: yup.string().matches(/^\d+(\.\d+)?$/, t('errorInvalid')),
    image: yup.string().required(t('errorImageRequire')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdatePrizeValidationSchema}
      enableReinitialize={true}
      initialValues={prize ? prize : initialValues}
      onSubmit={handleSubmitPrize}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
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
          <Form
            style={{
              height: window.innerHeight - 150 + 'px',
              overflowY: 'auto',
            }}>
            <Card className={classes.noMargin}>
              <CardBody className={classes.cardBody}>
                <div>
                  <p className={classes.titleFilter}>{t('basicInformation')}</p>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <Dropdown
                          title={t('gift_type')}
                          options={giftTypeOptions}
                          value={values.giftType}
                          handleOnChange={handleChange('giftType')}
                          helperErrorText={errors.giftType || ''}
                        />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <Dropdown
                          title="Code"
                          options={codeOptions[values.giftType]}
                          value={values.code}
                          handleOnChange={(e) => {
                            setFieldValue('code', e.target.value);
                            setFieldValue('value', valueOptions[e.target.value]);
                          }}
                          helperErrorText={errors.code || ''}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <TextField
                        className={classes.marginBottom_20}
                        error={!!errors.name}
                        id="name"
                        label={t('name')}
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={values.name}
                        onChange={handleChange('name')}
                        autoComplete="off"
                      />
                      {errors.name && (
                        <FormHelperText style={{ color: 'red' }}>{errors.name}</FormHelperText>
                      )}
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.percent} htmlFor="percent">
                            {t('percent')}
                          </InputLabel>
                          <OutlinedInput
                            id="percent"
                            value={values.percent}
                            onChange={handleChange('percent')}
                            startAdornment={
                              <InputAdornment position="start">
                                <p style={{ color: !!errors.percent && 'red' }}>%</p>
                              </InputAdornment>
                            }
                            labelWidth={70}
                            type="number"
                            autoComplete="off"
                            style={{ color: !!errors.percent && 'red' }}
                            error={!!errors.percent}
                          />
                        </FormControl>
                        {!!errors.percent && (
                          <FormHelperText style={{ color: 'red' }}>{errors.percent}</FormHelperText>
                        )}
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <Dropdown
                          title={t('type')}
                          options={typeOptions}
                          value={values.type}
                          handleOnChange={handleChange('type')}
                          helperErrorText={errors.type || ''}
                        />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.value} htmlFor="value">
                            {t('value')}
                          </InputLabel>
                          <OutlinedInput
                            id="value"
                            value={values.value}
                            onChange={handleChange('value')}
                            labelWidth={70}
                            type="number"
                            autoComplete="off"
                            style={{ color: !!errors.value && 'red' }}
                            error={!!errors.value}
                          />
                        </FormControl>
                        {!!errors.value && (
                          <FormHelperText style={{ color: 'red' }}>{errors.value}</FormHelperText>
                        )}
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.pointExchange} htmlFor="pointExchange">
                            {t('point_exchange')}
                          </InputLabel>
                          <OutlinedInput
                            id="pointExchange"
                            value={values.pointExchange}
                            onChange={handleChange('pointExchange')}
                            labelWidth={70}
                            type="number"
                            autoComplete="off"
                            style={{ color: !!errors.pointExchange && 'red' }}
                            error={!!errors.pointExchange}
                          />
                        </FormControl>
                        {!!errors.pointExchange && (
                          <FormHelperText style={{ color: 'red' }}>
                            {errors.pointExchange}
                          </FormHelperText>
                        )}
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.quantity} htmlFor="quantity">
                            {t('quantity')}
                          </InputLabel>
                          <OutlinedInput
                            id="quantity"
                            value={values.quantity}
                            onChange={handleChange('quantity')}
                            labelWidth={70}
                            type="number"
                            autoComplete="off"
                            style={{ color: !!errors.quantity && 'red' }}
                            error={!!errors.quantity}
                          />
                        </FormControl>
                        {!!errors.quantity && (
                          <FormHelperText style={{ color: 'red' }}>
                            {errors.quantity}
                          </FormHelperText>
                        )}
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.levels} htmlFor="levels">
                            {t('levels')}
                          </InputLabel>
                          <OutlinedInput
                            id="levels"
                            value={values.levels}
                            onChange={handleChange('levels')}
                            labelWidth={70}
                            type="number"
                            autoComplete="off"
                            style={{ color: !!errors.levels && 'red' }}
                            error={!!errors.levels}
                          />
                        </FormControl>
                        {!!errors.levels && (
                          <FormHelperText style={{ color: 'red' }}>{errors.levels}</FormHelperText>
                        )}
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <div className={classes.marginBottom_20}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel error={!!errors.alert} htmlFor="alert">
                            {t('alert')}
                          </InputLabel>
                          <OutlinedInput
                            id="alert"
                            value={values.alert}
                            onChange={handleChange('alert')}
                            labelWidth={70}
                            autoComplete="off"
                            error={!!errors.alert}
                          />
                        </FormControl>
                        {errors.alert && (
                          <FormHelperText style={{ color: 'red' }}>{errors.alert}</FormHelperText>
                        )}
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
                <p className={classes.titleFilter}>{t('description')}</p>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      multiline
                      id="input3"
                      label={t('description')}
                      variant="outlined"
                      size="small"
                      fullWidth
                      inputProps={{
                        value: values.description,
                        onChange: handleChange('description'),
                      }}
                      className={classes.marginBottom_20}
                      autoComplete="off"
                    />
                  </GridItem>
                </GridContainer>
                <div>
                  <p className={classes.titleFilter}>{t(`game.image`)}</p>
                  <div className={classes.imageForm}>
                    {selectedImages.length > 0 ? (
                      selectedImages.map((photo, index) => {
                        return (
                          <div key={index} className={classes.imgContainer}>
                            <Close
                              className={classes.btnClose}
                              onClick={() => handleRemoveImage(photo, setFieldValue)}
                            />
                            <img src={photo} alt="" key={photo} className={classes.imageUpload} />
                          </div>
                        );
                      })
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
                          style={{ borderColor: !!errors.image && 'red' }}
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default addUpdatePrize;
