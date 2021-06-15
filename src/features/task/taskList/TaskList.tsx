import React from 'react';
import TaskItem from '../taskItem/TaskItem';
import sampleData from './sampleData.json';
import styles from './TaskList.module.scss';

const TaskList: React.FC = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
