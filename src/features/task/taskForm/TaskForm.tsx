import React from 'react';
import styles from './TaskForm.module.scss';
import TextField from '@material-ui/core/TextField';

const TaskForm: React.FC = () => {
  return (
    <div className={styles.root}>
      <form className={styles.form} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="New task"
          variant="outlined"
          className={styles.text_field}
        />
      </form>
    </div>
  );
};

export default TaskForm;
