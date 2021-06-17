import React from 'react';
import TaskItem from '../taskItem/TaskItem';
import styles from './TaskList.module.scss';
import { useSelector } from 'react-redux';
import { selectTasks } from '../taskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
