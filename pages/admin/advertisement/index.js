import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import styles from 'assets/jss/natcash/views/game/gameIndexStyle';
import { NotificationContainer } from 'react-light-notifications';
import { useMobile } from 'hooks';
import { useTranslation } from 'react-i18next';

const Advertisement = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const { isMobile } = useMobile();
  const { t } = useTranslation();

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Advertisement</h4>
      </CardHeader>
    </Card>
  );
};

Advertisement.layout = Admin;

export default WithAuthentication(Advertisement);
