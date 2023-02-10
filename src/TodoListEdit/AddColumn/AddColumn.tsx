import React, {useState} from 'react';
import {Button, Input} from "antd";

interface AddColumnInterface{
    columnName:string|undefined,
    handleOnColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnClickNewColumn: () => void,

}
const AddColumn = (
    { columnName, handleOnColumnNameChange, handleOnClickNewColumn } : AddColumnInterface
) => {
    return <><div className="todo-list-edit-add-column">
        <Input
            placeholder="Column name"
            onChange={handleOnColumnNameChange}
            value={columnName}
        />

        <Button
            disabled={!columnName?.length}
            onClick={handleOnClickNewColumn}
        >
            Add column
        </Button>
    </div></>;
};

export default AddColumn;