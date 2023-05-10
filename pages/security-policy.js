import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// @material-ui/core components
// core components
import { makeStyles } from '@material-ui/core';
import Button from 'components/CustomButtons/Button.js';

import { Icon } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import logo from 'assets/img/logo.png';
import styles from 'assets/jss/natcash/views/supportStyle.js';

export default function Index() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const language = useSelector((state) => state.app.language);

  const listText = [
    {
      id: 'en',
    },
    {
      id: 'vi',
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

  const header = () => {
    return (
      <header className={classes.header}>
        <div className={classes.topHeader}>
          <div className={classes.mainContainer + ' ' + classes.flex_center_between}>
            <ul className={classes.listItem + ' ' + classes.flex_center}>
              <li className={classes.item + ' ' + classes.flex_center}>
                <Icon className={classes.icon}>phone</Icon>
                <p className={classes.itemText}>(+84) 928 868 858</p>
              </li>
              <li className={classes.item + ' ' + classes.flex_center}>
                <Icon className={classes.icon}>alternate_email</Icon>
                <p className={classes.itemText}>hanoimicrotec@gmail.com</p>
              </li>
            </ul>
            <Link href={'/login'}>
              <p className={classes.itemText + ' ' + classes.txtHover}>Login</p>
            </Link>
          </div>
        </div>
        <div className={classes.bottomHeader}>
          <div className={classes.mainContainer + ' ' + classes.flex_center_between}>
            <div className={classes.flex_center}>
              <img className={classes.logo} src={logo} />
              <p className={classes.txtLogo}>natcash</p>
            </div>
            <div className={classes.flex_center}>
              <ul className={classes.listItem + ' ' + classes.flex_center}>
                <li className={classes.item2 + ' ' + classes.flex_center + ' ' + classes.txtHover}>
                  <p className={classes.itemText2}>Feature</p>
                  <Icon className={classes.icon2}>keyboard_arrow_down</Icon>
                </li>
                <li className={classes.item2 + ' ' + classes.flex_center + ' ' + classes.txtHover}>
                  <p className={classes.itemText2}>Price list</p>
                  <Icon className={classes.icon2}>keyboard_arrow_down</Icon>
                </li>
              </ul>
              <Button color="info" className={classes.btnRegister}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const section_1 = () => {
    return (
      <div className={classes.section_1}>
        <GridContainer>
          <div className={classes.mainContainer + ' ' + classes.flex_center_between}>
            <GridItem xs={12} sm={12} md={12}>
              <h1>Information security</h1>
              <p>
                Customer information security is one of the top priorities to create the best
                shopping conditions for customers at natcash.com. We understand that the fair use
                and security of information will show our care for our customers. Therefore,
                natcash.com is very respectful and committed to ensure that the above information
                will be used in a reasonable and thoughtful manner, in order to improve the quality
                of customer care services and create a safe shopping environment. , most convenient
                &amp; professional.
              </p>
              <p>1. Collecting customer information</p>
              <p>
                To use the services of natcash.com, customers register an account and provide some
                information such as: Email, full name, phone number, address and some other
                information. This registration procedure is intended to help us determine the
                correct payment and delivery portion for the recipient. Customers can choose not to
                provide us with certain information, but then you won't be able to enjoy some of the
                benefits our features provide.
              </p>
              <p>
                We will store any information you enter on the website or submit to natcash.com.
                Such information will be used for the purpose of responding to customer requests,
                making appropriate suggestions for each customer when shopping at natcash.com,
                improving the quality of goods and services and contact you when needed
              </p>
              <p>
                In addition, transaction information including: purchase history, transaction value,
                shipping and payment methods are also stored by natcash.com to solve problems that
                may arise later.
              </p>
              <p>2. Use of information</p>
              <p>
                The purpose of collecting information is to build natcash.com into an e-commerce
                website that brings the most convenience to customers. Therefore, the use of
                information will serve the following activities:
              </p>
              <p>
                Send newsletter to introduce new products and promotions of natcash.com to
                customers.
              </p>
              <p>Provide a number of utilities, customer support services.</p>
              <p>Improve customer service quality of natcash.com.</p>
              <p>Resolve issues and disputes arising in connection with the use of the Website.</p>
              <p>Prevent activities that violate Vietnamese law.</p>
              <p>3. Information sharing</p>
              <p>
                natcash.com understands that customer information is a very important part of doing
                business and will not be sold or exchanged to any other third party. We will not
                share customer information except in the following specific cases:
              </p>
              <p>
                To protect natcash.com and other third parties: We only disclose account information
                and other personal information when we are confident that giving such information is
                in accordance with the law. rights and property of service users of natcash.com and
                other third parties. And in the policy rules towards third parties. We require third
                parties to take responsibility for the confidentiality of the customer information
                that we provide.
              </p>
              <p>
                Upon legal request from a government agency or when we believe it is necessary and
                appropriate to comply with legal requirements
              </p>
              <p>
                In the remaining cases, we will have a specific notice to you when we have to
                disclose information to a third party and this information will only be provided
                with the consent of the customer. client. For example, promotions with cooperation
                and sponsorship with partners of natcash.com; Provide the necessary forwarding
                information to the shipping units.
              </p>
              <p>
                natcash.com commits not to sell, not to share, resulting in the disclosure of
                customers' personal information for commercial purposes, violating the commitments
                set out in the customer information privacy policy. Shop at natcash.com.
              </p>
              <p>4. Confidentiality of customer information</p>
              <p>
                natcash.com uses HTTPS Secure Sockets Layer (SSL) protocol to protect customer
                information during data transfer by encrypting the information you enter.
              </p>
              <p>
                It is very important for customers to protect their own information against access
                to password information when sharing a computer with many people. Then you must be
                sure to log out of your account after using our service.
              </p>
              <p>
                We pledge not to intentionally disclose customer information, do not sell or share
                customer information of natcash.com for commercial purposes, violating the
                commitments between us and you. Customers in accordance with natcash.com's Customer
                Information Privacy Policy
              </p>
              <p>
                natcash.com understands that the interests of customers in protecting personal
                information are also our responsibility, so in any case, there are questions and
                comments related to our privacy policy. natcash.com, Customers please contact: 0928
                868 858 or email: hanoimicrotec@gmail.com
              </p>
              <p>Sincerely thank!</p>
            </GridItem>
          </div>
        </GridContainer>
      </div>
    );
  };
  return (
    <>
      {header()}
      {section_1()}
    </>
  );
}
