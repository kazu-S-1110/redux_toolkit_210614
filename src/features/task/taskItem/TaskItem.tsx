import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import styles from './TaskItem.module.scss';

interface PropTypes {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
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
        <button
          className={styles.edit_button}
          onClick={() => {
            console.log(`edit ${task.id}`);
          }}
        >
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
    </div>
  );
};

export default TaskItem;
