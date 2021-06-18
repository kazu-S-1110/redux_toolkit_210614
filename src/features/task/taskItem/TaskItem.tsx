import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleModalOpen,
  selectIsModalOpen,
  selectTask,
  completeTask,
} from '../taskSlice';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import styles from './TaskItem.module.scss';
import Modal from '@material-ui/core/Modal';
import TaskForm from '../taskForm/TaskForm';

interface PropTypes {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
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
          onClick={() => dispatch(completeTask(task))}
          className={styles.checkbox}
        />
        <button className={styles.edit_button} onClick={handleOpen}>
          <EditTwoToneIcon className={styles.icon} />
        </button>
        <button
          className={styles.delete_button}
          onClick={() => {
            console.log(`delete ${task.id}`);
          }}
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
