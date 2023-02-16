import { Input, Button } from 'antd';
import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setColumns} from "../TodoListReduxSlice";

const AddColumn = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: any) => state.todoListRedux.columns);
    const [newColumnName, setColumnName] = useState<string>('');

    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    const handleOnColumnNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setColumnName(e.target.value);
    };

    const handleOnClickNewColumn = () => {
        const newColumn = {
            value: randomId(),
            label: newColumnName,
        };

        dispatch(setColumns([...columns, newColumn]));
        setColumnName('');
    };

    return (
        <div className="todo-list-redux-add-column">
            <Input
                placeholder="Column name"
                onChange={handleOnColumnNameChange}
                value={newColumnName}
            />

            <Button
                disabled={!newColumnName.length}
                onClick={handleOnClickNewColumn}
            >
                Add column
            </Button>
        </div>
    );
};

export default AddColumn;
