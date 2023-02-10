import React, {useState} from 'react';
import {Button} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnInterface} from "../../TodoListEdit";

interface HeaderInterface{
    column: ColumnInterface,
    name: string,
    handleOnDeleteColumn: (id: string) => void,
    showModal: (column: ColumnInterface) => void,
}
const Header = (
    { column, name, handleOnDeleteColumn, showModal } : HeaderInterface
) => {
    return <div className={"todo-list-edit-column-header"}>
        <div>
            {name}
        </div>
        <div>
            <Button
                type="primary"
                size="small"
                icon={<EditOutlined/>}
                onClick={() => {showModal(column)}}
            />
            <Button
                type="primary"
                danger
                size="small"
                icon={<CloseOutlined/>}
                onClick={() => handleOnDeleteColumn(column.value)}
            />
        </div>

    </div>;
};

export default Header;