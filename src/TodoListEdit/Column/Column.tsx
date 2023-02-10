import React from 'react';
import {List} from "antd";
import {ColumnInterface, ItemInterface} from "../TodoListEdit";
import Header from "./Header";
import Item from "./Item";

interface ColumnInterface2 {
    column: ColumnInterface,
    items: ItemInterface[],
    label: string,
    handleOnDeleteColumn: (id: string) => void,
    handleOnDeleteItem: (id: string) => void,
    showColumnModal: (column: ColumnInterface) => void,
    showItemModal: (column: ColumnInterface, item: ItemInterface) => void,
}

const Column = (
    { column, items, label, handleOnDeleteItem, handleOnDeleteColumn, showItemModal, showColumnModal } : ColumnInterface2
) => {
    return <><List
        className="todo-list-edit-column"
        header={<Header
            column={column}
            name={label}
            handleOnDeleteColumn={handleOnDeleteColumn}
            showModal={showColumnModal}
        />}
        dataSource={items}
        renderItem={(item) => (
            <Item
                column={column}
                item={item}
                handleOnDeleteItem={handleOnDeleteItem}
                showModal={showItemModal}
            />
        )}
    /></>;
};

export default Column;