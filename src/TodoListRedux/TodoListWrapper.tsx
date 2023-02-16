import {Provider} from "react-redux";
import store from "./store";
import React from "react";
import TodoListRedux from "./TodoListRedux";

const TodoListReduxWrapper = () => {
    return <Provider store={store}>
        <TodoListRedux/>
    </Provider>;
};

export default TodoListReduxWrapper;