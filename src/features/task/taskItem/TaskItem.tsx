import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import styles from './TaskItem.module.scss';
import Modal from '@material-ui/core/Modal';

interface PropTypes {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onClick={() => {
            console.log(`check ${task.id}`);
          }}
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
      <Modal open={open} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
