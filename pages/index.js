import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @material-ui/core components
// core components
import {
  makeStyles
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";

import { Icon } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import computerImg from "assets/img/Banner-Homapage-VN-2.png";
import logoWide from "assets/img/logo-wide.png";
import styles from "assets/jss/natcash/views/homeStyle.js";
import {useTranslation} from "react-i18next";
import {loadTranslations} from "ni18n";
import {ni18nConfig} from "../ni18n.config";
import {useRouter} from "next/router";

export default function Index() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t, i18n } = useTranslation()
  const router = useRouter();

  useEffect(() => {
    router.push('admin/login')
  }, [])

  return (
    <>
    </>
  );
}

export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'translation',
      ])),
    },
  }
}