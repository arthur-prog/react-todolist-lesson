import React, {useState} from 'react';
import {Button, List} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnInterface, ItemInterface} from "../../TodoListEdit";

interface ItemInterface2{
    column: ColumnInterface,
    item: ItemInterface,
    handleOnDeleteItem: (id: string) => void,
    showModal: (column: ColumnInterface, item: ItemInterface) => void
}
const Item = (
    { column, item, handleOnDeleteItem, showModal } : ItemInterface2
) => {
    return <><List.Item className="todo-list-edit-item">
        {item.label}
        <div>
            <Button
                type="primary"
                size="small"
                icon={<EditOutlined/>}
                onClick={() => {showModal(column, item)}}
            />
            <Button
                type="primary"
                danger
                size="small"
                icon={<CloseOutlined/>}
                onClick={() => handleOnDeleteItem(item.id)}
            />
        </div>
    </List.Item></>;
};

export default Item;