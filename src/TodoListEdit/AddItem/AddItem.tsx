import React, {useState} from 'react';
import {Button, Input, Select} from "antd";
import {ColumnInterface} from "../TodoListEdit";

interface AddItemInterface{
    itemName:string|undefined,
    itemColumn:string|undefined,
    columns: ColumnInterface[],
    handleOnItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnCategoryChange: (value: string) => void,
    handleOnClickNewItem: () => void,
}
const AddItem = (
    { itemName, itemColumn, columns, handleOnItemNameChange, handleOnCategoryChange, handleOnClickNewItem } : AddItemInterface
) => {
    return <><div className="todo-list-edit-add-item">
        <Input
            placeholder="Item name"
            onChange={handleOnItemNameChange}
            value={itemName}
        />

        <Select
            placeholder="Select column"
            onChange={handleOnCategoryChange}
            value={itemColumn}
            options={columns}
        />

        <Button
            disabled={!itemName?.length || !itemColumn}
            onClick={handleOnClickNewItem}
        >
            Add Item
        </Button>
    </div></>;
};

export default AddItem;