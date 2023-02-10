import React, {useState} from 'react';
import {ItemInterface} from "../TodoListEdit";
import {Input, Modal} from "antd";


export interface ItemModalInterface{
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    columnName: string|undefined,
    handleOnColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    itemName: string|undefined,
    handleOnItemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ItemModal = (
    { isModalOpen, handleOk, handleCancel, itemName, handleOnItemNameChange, columnName, handleOnColumnNameChange }: ItemModalInterface
) => {
    return <><Modal title="Item Edition" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h1>Column</h1>
        <Input
            placeholder="Column name"
            onChange={handleOnColumnNameChange}
            value={columnName}
        />
        <h1>Item</h1>
        <Input
            placeholder="Item name"
            onChange={handleOnItemNameChange}
            value={itemName}
        />
    </Modal></>;
};

export default ItemModal;