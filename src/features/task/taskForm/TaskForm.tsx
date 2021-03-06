import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaskForm.module.scss';
import { useForm } from 'react-hook-form';
import {
  createTask,
  handleModalOpen,
  selectSelectedTask,
  editTask,
  fetchTasks,
} from '../taskSlice';
import { AppDispatch } from '../../../app/store';
import TextField from '@material-ui/core/TextField';

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.FC<PropTypes> = ({ edit }) => {
  const selectedTask = useSelector(selectSelectedTask);
  const dispatch: AppDispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = async (data: Inputs) => {
    await createTask(data.taskTitle);
    reset(); //reset関数を発火することでテキストフィールドを空にできる。
    dispatch(fetchTasks());
  };
  const handleEdit = async (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    await editTask(sendData);
    dispatch(handleModalOpen(false));
    dispatch(fetchTasks());
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
          defaultValue={edit ? selectedTask.title : ''}
          variant="outlined"
          {...register('taskTitle')} //useformとの連携（バージョン７から書式違う）
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              className={styles.cancel_button}
              onClick={() => {
                dispatch(handleModalOpen(false));
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
