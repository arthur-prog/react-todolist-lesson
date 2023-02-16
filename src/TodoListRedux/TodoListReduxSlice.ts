import { createSlice } from '@reduxjs/toolkit';
import { Column, Item } from './TodoListRedux';

export interface TodoListRedux {
    columns: Column[];
    items: Item[];
    itemModal: Item;
    columnModal: Column;
}

export const todoListReduxSlice = createSlice({
    name: 'todoListRedux',
    initialState: {
        columns: [],
        items: [],
        columnModal: null,
        itemModal: null,
    },
    reducers: {
        setColumns: (state: {columns: Column[]}, action: { payload: Column[] }) => {
            state.columns = action.payload;
        },
        setItems: (state: {items: Item[]}, action: { payload: Item[] }) => {
            state.items = action.payload;
        },
        setColumnModal: (state: {columnModal: Column|null}, action: { payload: Column|null }) => {
            state.columnModal = action.payload;
        },
        setItemModal: (state: {itemModal: Item|null}, action: { payload: Item|null }) => {
            state.itemModal = action.payload;
        },
    },
});

export const { setColumns, setItems, setItemModal, setColumnModal } = todoListReduxSlice.actions;

export default todoListReduxSlice.reducer;
