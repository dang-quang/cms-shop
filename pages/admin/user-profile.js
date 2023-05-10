import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// layout for this page
import Admin from 'layouts/Admin.js';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import { TextField, FormControl, Input, InputAdornment, IconButton } from '@material-ui/core';
// core components
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { setShowLoader } from '../../redux/actions/app';
import { getUserProfile, changePassword } from '../../utilities/ApiManage';
import {
  hasUpperCase,
  hasLowerCase,
  hasWhiteSpace,
  hasNumber,
  hasLeastDigits,
  hasUnicode,
} from '../../utilities/utils';
import avatar from 'assets/img/faces/marc.jpg';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  text: {
    margin: '10px 0',
  },
  center: {
    margin: '0 auto !important',
    display: 'block',
  },
  helperText: {
    color: 'red',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 400,
  },
  fcCustom: {
    marginBottom: 20,
  },
};

function UserProfile() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const language = useSelector((state) => state.app.language);
  const [user, setUser] = useState([]);
  const [isPassError, setIsPassError] = useState();
  const [helperTextPassword, setHelperTextPassword] = useState('');
  const [isNewPassError, setIsNewPassError] = useState();
  const [helperTextNewPassword, setHelperTextNewPassword] = useState('');
  const [isConfirmPassError, setIsConfirmPassError] = useState();
  const [helperTextConfirmPassword, setHelperTextConfirmPassword] = useState('');
  const [values, setValues] = useState({
    password: '',
    new_password: '',
    confirm_password: '',
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const getUser = async () => {
    dispatch(setShowLoader(true));
    var res = await getUserProfile();
    setUser(res);
    dispatch(setShowLoader(false));
  };

  useEffect(() => {
    getUser();
  }, []);

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //change password
  const handelChangePassword = async () => {
    dispatch(setShowLoader(true));
    let password = values.password;
    let new_password = values.new_password;
    var res = await changePassword(user.email, new_password, password);
    dispatch(setShowLoader(false));
    if (res.success == true) {
      Router.push('/login');
    } else {
      NotificationManager.error({
        title: 'Error',
        message: res.message,
      });
    }
  };

  const handleBlurPassword = () => {
    let password = values.password;
    if (password.length > 0) {
      setIsPassError(false);
    } else {
      setIsPassError(true);
      setHelperTextPassword('Required to enter');
    }
  };

  const handleBlurNewPassword = () => {
    let new_password = values.new_password;
    //check length, uppercase, lowercase letters, white space
    if (
      new_password.length >= 8 &&
      new_password.length <= 100 &&
      hasUpperCase(new_password) &&
      hasLowerCase(new_password) &&
      !hasWhiteSpace(new_password) &&
      hasLeastDigits(new_password, 2) &&
      !hasUnicode(new_password)
    ) {
      setIsNewPassError(false);
    } else {
      setIsNewPassError(true);
      setHelperTextNewPassword(
        'Password must have length [8 - 100], uppercase, lowercase letters. Must have at least 2 digits not have spaces and unicode.'
      );
    }
  };

  const handleBlurConfirmPassword = () => {
    let new_password = values.new_password;
    let confirm_password = values.confirm_password;
    if (new_password === confirm_password && confirm_password.length > 0) {
      setIsConfirmPassError(false);
    } else {
      setIsConfirmPassError(true);
      setHelperTextConfirmPassword('Confirm password does not match the New password or null');
    }
  };

  const canSubmit = () => {
    let password = values.password;
    if (isNewPassError == false && isConfirmPassError == false && password.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={user.avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory + ' ' + classes.text}>{user.name}</h6>
              <h4 className={classes.cardTitle + ' ' + classes.text}>{user.email}</h4>
              <form autoComplete="off">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth className={classes.fcCustom}>
                      <InputLabel htmlFor="standard-adornment-password-1">Password</InputLabel>
                      <Input
                        error={isPassError}
                        id="standard-adornment-password-1"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChangeValue('password')}
                        onBlur={() => handleBlurPassword()}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('showPassword')}
                              onMouseDown={handleMouseDownPassword}>
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {isPassError && (
                        <span className={classes.helperText}>{helperTextPassword}</span>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth className={classes.fcCustom}>
                      <InputLabel htmlFor="standard-adornment-password-2">New password</InputLabel>
                      <Input
                        error={isNewPassError}
                        id="standard-adornment-password-2"
                        type={values.showNewPassword ? 'text' : 'password'}
                        value={values.new_password}
                        onChange={handleChangeValue('new_password')}
                        onBlur={() => handleBlurNewPassword()}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('showNewPassword')}
                              onMouseDown={handleMouseDownPassword}>
                              {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {isNewPassError && (
                        <span className={classes.helperText}>{helperTextNewPassword}</span>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth className={classes.fcCustom}>
                      <InputLabel htmlFor="standard-adornment-password-3">
                        Confirm password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password-3"
                        error={isConfirmPassError}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        value={values.confirm_password}
                        onChange={handleChangeValue('confirm_password')}
                        onBlur={() => handleBlurConfirmPassword()}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => handleClickShowPassword('showConfirmPassword')}
                              onMouseDown={handleMouseDownPassword}>
                              {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {isConfirmPassError && (
                        <span className={classes.helperText}>{helperTextConfirmPassword}</span>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter>
              <Button
                color={canSubmit() ? 'primary' : null}
                round
                className={classes.center}
                onClick={() => handelChangePassword()}
                disabled={!canSubmit()}>
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <NotificationContainer />
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
