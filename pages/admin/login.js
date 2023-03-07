import React, {useCallback, useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import styles from "assets/jss/natcash/views/loginStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Form from "components/Form/Form.js";
import FormHeader from "components/Form/FormHeader.js";
import FormBody from "components/Form/FormBody.js";
import backgroundImage from "assets/img/login-background-min.png";
import {NotificationContainer, NotificationManager,} from "react-light-notifications";
import {userLogin} from "../../redux/actions/user";
import PageLoader from "components/PageLoader/PageLoader.js";
import {initData} from "../../utilities/ApiManage";
import {encryptSha256, encryptString} from "../../utilities/utils";
import {buildKey} from "../../utilities/const";
import {useTranslation} from "react-i18next";

function login(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showLoader = useSelector((state) => state.app.showLoader);
  const {t} = useTranslation();

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      return NotificationManager.error({
        title: t('login.login'),
        message: t('login.loginError'),
      });
    }

    const initToken = await encryptString(`${localStorage.getItem("DEVICEID")}##${buildKey}`);
    localStorage.setItem("INITTOKEN", initToken);

    const responseInit = await initData();
    if (responseInit.signatureKey && responseInit.rsaPublicKey && responseInit.rsaPrivateKey) {
      localStorage.setItem("RSAPUBLIC",responseInit.rsaPublicKey);
      localStorage.setItem("RSAPRIVATE",responseInit.rsaPrivateKey);
      localStorage.setItem("RSASIGNATURE",responseInit.signatureKey);
    } else {
      localStorage.setItem("RSAPUBLIC", undefined);
      localStorage.setItem("RSAPRIVATE", undefined);
      localStorage.setItem("RSASIGNATURE", undefined);
      return NotificationManager.error({
        title: "Error",
        message: "Network Error",
      });
    }

    const encAccessToken = await encryptString(`${localStorage.getItem("DEVICEID")}##vn.supper.app.apigw`,
    localStorage.getItem("RSAPUBLIC"));
    localStorage.setItem("ENCACCESSTOKEN", encAccessToken);
    
    const text = `${username}${password}`;
    const signatureKey = await encryptSha256(text, localStorage.getItem("RSASIGNATURE"));
    localStorage.setItem("SIGNATUREKEY", signatureKey);

    props.userLogin(username, password);
  }, [username, password]);

 
  useEffect(() => {
    import('device-uuid').then( module => {
      localStorage.setItem('DEVICEID', new module.DeviceUUID().get().replace(/-/g, ''));
  });  

  }, [])

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <NotificationContainer />
      {showLoader && <PageLoader />}
      <Form className={classes.loginContainer}>
        <FormHeader title={t('login.login')} />
        <FormBody>
          <GridContainer style={{ padding: "0 30px" }}>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                labelText={t('login.userName')}
                id="username"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  className: classes.txtInput,
                  value: username,
                  onChange: onChangeUsername,
                }}
              />
              <CustomInput
                labelText={t('login.pass')}
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  className: classes.txtInput,
                  type: "password",
                  value: password,
                  onChange: onChangePassword,
                }}
              />
              <Button
                className={classes.btnLogin}
                onClick={() => handleLogin()}
                color="primary"
              >
                {t('login.login')}
              </Button>
            </GridItem>
          </GridContainer>
        </FormBody>
      </Form>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
}))(login);
