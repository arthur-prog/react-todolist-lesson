import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { Column } from '../TodoListRedux';
import {useDispatch, useSelector} from "react-redux";
import {setItems} from "../TodoListReduxSlice";


const AddItem = () => {
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemColumn, setNewItemColumn] = useState<string>();
    const dispatch = useDispatch();
    const columns = useSelector((state: any) => state.todoListRedux.columns);
    const items = useSelector((state: any) => state.todoListRedux.items);

    const randomId = () => (Math.random() + 1).toString(36).substring(7);
    const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    const handleOnClickNewItem = () => {
        const newItem = {
            id: randomId(),
            label: newItemName,
            columnId: newItemColumn,
        };

        dispatch(setItems([...items, newItem]));

        setNewItemName('');
        setNewItemColumn(undefined);
    };

    return (
        <div className="todo-list-redux-add-item">
            <Input
                placeholder="Item name"
                onChange={handleOnItemNameChange}
                value={newItemName}
            />

            <Select
                placeholder="Select column"
                onChange={handleOnCategoryChange}
                value={newItemColumn}
                options={columns}
            />

            <Button
                disabled={!newItemName?.length || !newItemColumn}
                onClick={handleOnClickNewItem}
            >
                Add Item
            </Button>
        </div>
    );
};

export default AddItem;
