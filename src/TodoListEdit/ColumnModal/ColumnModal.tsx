import React from 'react';
import {Input, Modal} from "antd";


export interface ColumnModalInterface{
    isModalOpen: boolean,
    handleOk: () => void,
    handleCancel: () => void,
    columnName: string|undefined,
    handleOnColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ColumnModal = (
    { isModalOpen, handleOk, handleCancel, handleOnColumnNameChange, columnName } : ColumnModalInterface
) => {
    return <><Modal title="Column Edition" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
            placeholder="Column name"
            onChange={handleOnColumnNameChange}
            value={columnName}
        />
    </Modal></>;
};

export default ColumnModal;