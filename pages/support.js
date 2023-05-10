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
              <h1>Resolve complaints</h1>
              <p>1. Purpose of customer inquiries - complaints:</p>
              <ul>
                <li>
                  natcash.com wishes to bring customers a satisfied care service experience and safe
                  and reliable products.
                </li>
                <li>
                  natcash.com will carefully verify each complaint and provide reasonable solutions
                  in a timely, thoughtful and most dedicated manner to protect the interests of
                  customers.
                </li>
                <li>
                  Complaint settlement is the bridge connecting customers with natcash.com, helping
                  us to become more and more perfect, a reliable destination for Vietnamese
                  families.
                </li>
                <li>
                  During the transaction process, if you have any questions about products or
                  services, or detect deficiencies in the professional service, service style and
                  spirit, natcash.com would like to receive feedback. feedback from customers.
                </li>
              </ul>
              <p>2. Process of receiving and handling customer inquiries - complaints:</p>
              <p className={classes.pPaddingLeft1}>Step 1</p>
              <p className={classes.pPaddingLeft2}>
                Customers send feedback to natcash.com by the following ways:
              </p>
              <ul>
                <li className={classes.listStyle}>
                  <ul>
                    <li>
                      Directly: Customers please respond to staff at Microtec nationwide or Customer
                      Care Department natcash.com
                    </li>
                    <li>
                      Phone: By calling the Customer Care hotline 0928 868 858 (24/7 all days of the
                      week including holidays and New Year).
                    </li>
                    <li>Email: Send email to: hanoimicrotec@gmail.com</li>
                  </ul>
                </li>
              </ul>
              <p className={classes.pPaddingLeft1}>Step 2</p>
              <p className={classes.pPaddingLeft2}>
                The Customer Care Specialist of Ha Noi Microtec receives customer feedback, conducts
                information verification of related issues.
              </p>
              <p className={classes.pPaddingLeft1}>Step 3</p>
              <p className={classes.pPaddingLeft2}>
                Handling customer inquiries - complaints (during office hours)
              </p>
              <p>3. Regulations on handling customer inquiries and complaints:</p>
              <p className={classes.pPaddingLeft1}>3.1 Time to resolve questions - complaints:</p>
              <p className={classes.pPaddingLeft2}>
                All inquiries - complaints from customers will be recorded and answered immediately
                within a period of 60 minutes (office hours 8:00 - 17:00), in some cases it is
                necessary to contact multiple departments to Maximum customer support is no later
                than 24 hours from the date of receipt (excluding Sundays) and will be handled
                effectively within 03 working days at the latest. In case of force majeure, the two
                parties will negotiate the time by themselves.
              </p>
              <p className={classes.pPaddingLeft1}>
                3.2 Regulations on handling customer inquiries and complaints:
              </p>
              <ul>
                <li className={classes.listStyle}>
                  <ul>
                    <li>
                      Customer Care Department of Ha Noi Microtec will receive and analyze in detail
                      each customer's query - complaint, depending on the nature and extent of the
                      inquiry - complaint, Tho Tho Shop will have Specific measures to support
                      fully, conscientiously and thoughtfully, bring the highest satisfaction and
                      peace of mind to customers.
                    </li>
                    <li>
                      Regulations on handling inquiries and complaints from customers of Tho Tho
                      Shop are based on agreement and respect for customers, in strict compliance
                      with legal regulations. In case the complaint is beyond the ability of both
                      parties to settle, the matter will be taken to the competent State agencies
                      for settlement.
                    </li>
                    <li>
                      Your honest and honest opinions are an extremely valuable asset to the
                      development of natcash.com in accordance with our operating motto:
                      &ldquo;Regarding customers as relatives - placing orders Customers are the
                      center of all our thoughts and actions&rdquo;.
                    </li>
                  </ul>
                </li>
              </ul>
              <p>ANY QUESTIONS PLEASE CONTACT:</p>
              <p>Customer Care Department</p>
              <p>Ha Noi Microtec Company - Mother and Baby supermarket system natcash.com</p>
              <p>Hotline: 0928 868 858 / Email: hanoimicrotec@gmail.com</p>
              <p>Sincerely thank you!</p>
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
