import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './header.module.scss';
import { auth } from '../firebase';
import * as H from 'history';

interface PropTypes {
  history: H.History;
}

const Header: React.FC<PropTypes> = ({ history }) => {
  const handleSignout = async () => {
    try {
      await auth.signOut();
      history.push('/user-auth');
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant="h6" className={styles.title}>
            Redux Toolkit Todo
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
