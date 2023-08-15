import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import styles from 'assets/jss/natcash/views/loginStyle.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Form from 'components/Form/Form.js';
import FormHeader from 'components/Form/FormHeader.js';
import FormBody from 'components/Form/FormBody.js';
import backgroundImage from 'assets/img/login-background-min.png';
import { NotificationManager } from 'react-light-notifications';
import PageLoader from 'components/PageLoader/PageLoader.js';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Image, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { setShowLoader } from 'redux/actions/app';
import { BUILD_KEY } from 'utilities/const';
import { encryptSha256, encryptString } from 'utilities/utils';
import { initData } from 'utilities/ApiManage';
import { userLogin } from 'redux/actions/user';
import Images from 'assets';

function login(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showLoader = useSelector((state) => state.app.showLoader);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      return NotificationManager.error({
        title: t('login.login'),
        message: t('login.loginError'),
      });
    }

    const initToken = await encryptString(`${localStorage.getItem('DEVICEID')}##${BUILD_KEY}`);
    localStorage.setItem('INITTOKEN', initToken);

    dispatch(setShowLoader(true));
    const responseInit = await initData();
    dispatch(setShowLoader(false));

    if (responseInit.signatureKey && responseInit.rsaPublicKey && responseInit.rsaPrivateKey) {
      localStorage.setItem('RSAPUBLIC', responseInit.rsaPublicKey);
      localStorage.setItem('RSAPRIVATE', responseInit.rsaPrivateKey);
      localStorage.setItem('RSASIGNATURE', responseInit.signatureKey);
    } else {
      localStorage.setItem('RSAPUBLIC', undefined);
      localStorage.setItem('RSAPRIVATE', undefined);
      localStorage.setItem('RSASIGNATURE', undefined);
      return NotificationManager.error({
        title: 'Error',
        message: 'Network Error',
      });
    }

    const encAccessToken = await encryptString(
      `${localStorage.getItem('DEVICEID')}##${BUILD_KEY}`,
      localStorage.getItem('RSAPUBLIC')
    );
    localStorage.setItem('ENCACCESSTOKEN', encAccessToken);

    const text = `${username}${password}`;
    const signatureKey = await encryptSha256(text, localStorage.getItem('RSASIGNATURE'));
    localStorage.setItem('SIGNATUREKEY', signatureKey);

    props.userLogin(username, password);
  }, [username, password]);

  useEffect(() => {
    import('device-uuid').then((module) => {
      localStorage.setItem('DEVICEID', new module.DeviceUUID().get().replace(/-/g, ''));
    });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box minH="100vh">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px="32"
        shadow="0px 4px 4px 3px rgba(0, 0, 0, 0.10)">
        <Flex alignItems="center">
          <Image boxSize="80px" objectFit="contain" src={Images.shopping_bag} />
          <Image w="260px" h="70px" objectFit="contain" src={Images.logo} />
        </Flex>
        <Text cursor="pointer" textStyle="h3" color="red">
          You need help?
        </Text>
      </Flex>
      {showLoader && <PageLoader />}
      <SimpleGrid columns={2}>
        <Box>
          <Text color >Natshop profesional management</Text>
          <Text>Help admin and shop-user manage your channel more effectively.</Text>
          <Image />
        </Box>
        <Box>
          <Text>Welcome to atshop Management</Text>
          <Input
            id="username"
            variant="login"
            placeholder={t('login.userName')}
            value={username}
            onChange={onChangeUsername}
          />
          <Input
            mt="6"
            id="password"
            variant="login"
            type="password"
            placeholder={t('login.pass')}
            value={password}
            onChange={onChangePassword}
          />
          <Button className={classes.btnLogin} onClick={() => handleLogin()} color="primary">
            {t('login.login')}
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default connect(null, (dispatch) => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
}))(login);
