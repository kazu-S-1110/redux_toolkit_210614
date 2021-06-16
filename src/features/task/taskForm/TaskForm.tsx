import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TaskForm.module.scss';
import { useForm } from 'react-hook-form';
import { createTask } from '../taskSlice';
import TextField from '@material-ui/core/TextField';

type Inputs = {
  taskTitle: string;
};

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle)); //taskSliceの関数を発火させるためにdispatchが必要
    reset(); //reset関数を発火することでテキストフィールドを空にできる。
  };
  return (
    <div className={styles.root}>
      <form
        onSubmit={handleSubmit(handleCreate)} //react-hook-formの特徴！
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label="New task"
          variant="outlined"
          {...register('taskTitle')} //useformとの連携（バージョン７から書式違う）
          className={styles.text_field}
        />
      </form>
    </div>
  );
};

export default TaskForm;
