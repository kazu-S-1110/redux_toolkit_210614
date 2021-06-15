import React from 'react';
import styles from './App.module.scss';
import Header from './components/header';
import TaskForm from './features/task/taskForm/TaskForm';
import TaskItem from './features/task/taskItem/TaskItem';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        {/* <TaskItem /> */}
      </div>
    </div>
  );
};

export default App;
