import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleModalOpen,
  selectIsModalOpen,
  selectTask,
  // completeTask,
  // deleteTask,
  editTask,
  fetchTasks,
  deleteTask,
} from '../taskSlice';
import { AppDispatch } from '../../../app/store';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import styles from './TaskItem.module.scss';
import Modal from '@material-ui/core/Modal';
import TaskForm from '../taskForm/TaskForm';

interface PropTypes {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch: AppDispatch = useDispatch();
  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  const handleEdit = async (id: string, title: string, completed: boolean) => {
    const sendData = { id, title, completed: !completed };
    await editTask(sendData);
    dispatch(fetchTasks());
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    dispatch(fetchTasks());
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>

      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          color="primary"
          onClick={() => handleEdit(task.id, task.title, task.completed)}
          className={styles.checkbox}
        />
        <button className={styles.edit_button} onClick={handleOpen}>
          <EditTwoToneIcon className={styles.icon} />
        </button>
        <button
          className={styles.delete_button}
          onClick={() => handleDelete(task.id)}
        >
          <DeleteOutlineTwoToneIcon className={styles.icon} />
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
