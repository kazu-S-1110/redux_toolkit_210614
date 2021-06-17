import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TaskForm.module.scss';
import { useForm } from 'react-hook-form';
import { createTask } from '../taskSlice';
import TextField from '@material-ui/core/TextField';

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropTypes> = ({ edit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle)); //taskSliceの関数を発火させるためにdispatchが必要
    reset(); //reset関数を発火することでテキストフィールドを空にできる。
  };
  const handleEdit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)} //react-hook-formの特徴！
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={edit ? 'Edit Task' : 'New Task'}
          defaultValue={edit ? 'defaultValue' : ''}
          variant="outlined"
          {...register('taskTitle')} //useformとの連携（バージョン７から書式違う）
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button type="button" className={styles.cancel_button}>
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
