import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface HeaderInterface {
    label: string;
    onReduxColumn(): void;
    onDeleteColumn(): void;
}

const Header = ({ label, onReduxColumn, onDeleteColumn }: HeaderInterface) => {
    return (
        <div className="todo-list-column-header">
            {label}

            <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={onReduxColumn}
            />

            <Button
                type="primary"
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={onDeleteColumn}
            />
        </div>
    );
};

export default Header;
