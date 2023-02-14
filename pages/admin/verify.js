import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import styles from "assets/jss/natcash/views/loginStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Form from "components/Form/Form.js";
import FormHeader from "components/Form/FormHeader.js";
import FormBody from "components/Form/FormBody.js";
import backgroundImage from "assets/img/login-background-min.png";
import {
  NotificationContainer,
  NotificationManager,
} from "react-light-notifications";
import { connect } from "react-redux";
import { userVerify } from "../../redux/actions/user";
import PageLoader from "components/PageLoader/PageLoader.js";

function verify(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [values, setValues] = useState({
      email: "",
      phone_number: "",
      answer: ""
  });

  const LABEL = [
    {
      id: "en",
      value: ["Email", "Phone number", "Answer"],
    },
    {
      id: "vi",
      value: ["Email", "Số điện thoại", "Câu trả lời"],
    },
  ];

  const language = useSelector((state) => state.app.language);
  const showLoader = useSelector((state) => state.app.showLoader);
  const listText = [
    {
      id: "en",
      title: "Verify",
      btnLog: "VERIFY",
      txtErr: "Please enter Username and Password!",
      label: LABEL[0].value
    },
    {
      id: "vi",
      title: "Xác thực",
      btnLog: "XÁC THỰC",
      txtErr: "Vui lòng nhập Tài khoản và Mật khẩu",
      label: LABEL[1].value
    },
  ];
  const [text, setText] = useState(listText[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);


  const handelChangeValue = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleVerify = () => {
    props.userVerify(values.email, values.phone_number, values.answer)
  }


  return (
    <div
      className={classes.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {showLoader && <PageLoader />}
      <NotificationContainer />
      <Form className={classes.loginContainer}>
        <FormHeader title={text.title} />
        <FormBody>
          <GridContainer style={{ padding: "0 30px" }}>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                labelText={text.label[0]}
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  className: classes.txtInput,
                  value: values.email,
                  onChange: handelChangeValue("email"),
                }}
              />
              <CustomInput
                labelText={text.label[1]}
                id="phone_number"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  className: classes.txtInput,
                  value: values.phone_number,
                  onChange: handelChangeValue("phone_number"),
                }}
              />
              <p style={{ color: "white", marginBottom: "0" }}>What is your business secret?</p>
              <CustomInput
                labelText={text.label[2]}
                id="answer"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  className: classes.txtInput,
                  value: values.answer,
                  onChange: handelChangeValue("answer"),
                }}
              />
              <Button
                className={classes.btnLogin}
                onClick={() => handleVerify()}
                color="primary"
              >
                {text.btnLog}
              </Button>
              {/* cái câu hỏi bảo mật tạm thời fix là : What is your business secret?
                nút submit check : admin@knic.vn, 84977094958, "Nothing" nếu đúng cả 3 thì vào admin
                câu trả lời "Nothing" là check equal nhé email thì to_lower */}
            </GridItem>
          </GridContainer>
        </FormBody>
      </Form>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  userVerify: (email, phone, answer) => dispatch(userVerify(email, phone, answer)),
}))(verify);
