import React, {useState} from 'react';
import {ColumnInterface, ItemInterface} from "../TodoListEdit";
import {Input, Modal, Select} from "antd";


export interface ItemModalInterface{
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    columnName: string|undefined,
    handleOnSelectColumnNameChange: (value: string) => void
    itemName: string|undefined,
    handleOnItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    columns: ColumnInterface[]
}

const ItemModal = (
    { isModalOpen, handleOk, handleCancel, itemName, handleOnItemNameChange, columnName, handleOnSelectColumnNameChange, columns }: ItemModalInterface
) => {
    return <><Modal title="Item Edition" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="todo-list-edit-add-item">
            <Input
                placeholder="Item name"
                onChange={handleOnItemNameChange}
                value={itemName}
            />
            <Select
                placeholder="Select column"
                onChange={handleOnSelectColumnNameChange}
                value={columnName}
                options={columns}
            />
        </div>
    </Modal></>;
};

export default ItemModal;