import React from 'react';
import styles from './App.module.scss';
import Header from './components/header';
import TaskForm from './features/task/taskForm/TaskForm';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
      </div>
    </div>
  );
};

export default App;
