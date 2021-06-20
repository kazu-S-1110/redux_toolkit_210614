import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { RootState, AppThunk } from '../../app/store';
import { db } from '../../firebase';

interface TaskState {
  idCount: number; //taskが何個あるかを管理
  tasks: { id: string; title: string; completed: boolean }[]; // storeに保存するtaskの一覧,firestoreではidをstringで管理しているのでstringに変更
  selectedTask: { id: string; title: string; completed: boolean }; //どのtaskが選択されているか
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: { id: '', title: '', completed: false },
  isModalOpen: false,
};

/* ===========================
  taskの全件取得
=========================== */
export const fetchTasks = createAsyncThunk('task/getAllTasks', async () => {
  // 日付の降順（新しいデータが上に来る）にデータをソートしてtaskのデータを全件取得
  const res = await db.collection('tasks').orderBy('dateTime', 'desc').get();
  //レスポンスの整形
  const allTasks = res.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }));

  const taskNumber = allTasks.length;
  const passData = { allTasks, taskNumber };
  return passData;
});
/* ===========================
  taskの新規作成
=========================== */
export const createTask = async (title: string): Promise<void> => {
  try {
    // 現在時刻の取得
    const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
    // firestoreのtaskコレクションにデータを追加
    await db
      .collection('tasks')
      .add({ title: title, completed: false, dateTime: dateTime });
  } catch (err) {
    alert(err);
  }
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //タスクの作成
    // createTask: (state, action) => {
    //   // state.idCount++;
    //   // const newTask = {
    //   //   id: state.idCount,
    //   //   title: action.payload,
    //   //   completed: false,
    //   // };
    //   // state.tasks = [newTask, ...state.tasks];
    // },
    //taskの編集
    editTask: (state, action) => {
      //state.tasksの中から指定したtaskを抜き出す
      // const task = state.tasks.find((t) => t.id === action.payload.id);
      // if (task) {
      //   // 抜き出したtaskのtitleを書き換える
      //   task.title = action.payload.title;
      // }
    },
    //Modalを開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },

    //どのtaskを選択しているか管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    //task完了・未完了のチェックを変更
    completeTask: (state, action) => {
      // const task = state.tasks.find((t) => t.id === action.payload.id);
      // if (task) {
      //   //抜き出したtaskのcompletedを反転させる
      //   task.completed = !task.completed;
      // }
    },
    //taskの削除
    deleteTask: (state, action) => {
      //指定したtask以外を新しくstate.tasksの配列に作成し直している
      // state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    //stateとactionの型が正しく推論されるようにbuilder関数を使用
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.allTasks;
      state.idCount = action.payload.taskNumber;
    });
  },
});

export const {
  // createTask,
  selectTask,
  handleModalOpen,
  editTask,
  completeTask,
  deleteTask,
} = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks = (state: RootState): TaskState['tasks'] =>
  state.task.tasks;
export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
  state.task.isModalOpen;
export const selectSelectedTask = (
  state: RootState
): TaskState['selectedTask'] => state.task.selectedTask;

export default taskSlice.reducer;
