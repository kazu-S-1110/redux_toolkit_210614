import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './header.module.scss';
import { auth } from '../firebase';
import * as H from 'history';

interface PropTypes {
  history: H.History;
}

const Header: React.FC<PropTypes> = ({ history }) => {
  const handleSignOut = async () => {
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
          <Button onClick={handleSignOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
