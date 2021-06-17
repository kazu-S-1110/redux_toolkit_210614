import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface TaskState {
  idCount: number; //taskが何個あるかを管理
  tasks: { id: number; title: string; completed: boolean }[]; // storeに保存するtaskの一覧
  selectedTask: { id: number; title: string; completed: boolean }; //どのtaskが選択されているか
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: 'Task A', completed: false }],
  selectedTask: { id: 0, title: '', completed: false },
  isModalOpen: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //タスクの作成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //Modalを開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },

    //どのtaskを選択しているか管理
    selectTask: (state,action) => {
      state.selectedTask = action.payload
    },
  },
});

export const { createTask,selectTask ,handleModalOpen } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks= (state: RootState):TaskState["tasks"] => state.task.tasks;
export const selectIsModalOpen = (state: RootState):TaskState["isModalOpen"] => state.task.isModalOpen;
export const selectSelectedTask = (state: RootState):TaskState["selectedTask"] => state.task.selectedTask;




export default taskSlice.reducer;
