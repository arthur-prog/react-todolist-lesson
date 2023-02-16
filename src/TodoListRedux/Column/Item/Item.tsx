import React from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { List, Button } from 'antd';

interface ItemInterface {
    label: string;
    id: string;
    onDeleteItem(): void;
    onReduxItem(): void;
}

const Item = ({ label, id, onDeleteItem, onReduxItem }: ItemInterface) => {
    return (
        <List.Item className="todo-list-redux-item">
            {label}
            <div className="todo-list-redux-item-action">
                <Button
                    type="primary"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={onReduxItem}
                />
                <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={onDeleteItem}
                />
            </div>
        </List.Item>
    );
};

export default Item;
