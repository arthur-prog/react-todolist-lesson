import { configureStore } from '@reduxjs/toolkit';
import todoListReduxSlice, {TodoListRedux} from "./TodoListReduxSlice";

export interface State {
    todoListRedux: TodoListRedux
}

export default configureStore({
    reducer: {
        todoListRedux: todoListReduxSlice,
    },
});
