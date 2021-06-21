import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './features/task/taskSlice';
import { AppDispatch } from './app/store';
import styles from './App.module.scss';
import Header from './components/header';
import TaskForm from './features/task/taskForm/TaskForm';
import TaskList from './features/task/taskList/TaskList';
import { auth } from './firebase';
import { RouteComponentProps } from 'react-router-dom';

const App: React.FC<RouteComponentProps> = (props) => {
  console.log(auth);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const getData = () => {
      dispatch(fetchTasks());
    };
    getData();
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header history={props.history} />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
