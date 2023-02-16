import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column } from '../TodoListRedux';
import {setColumnModal, setColumns} from "../TodoListReduxSlice";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";



const ColumnModal = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: State) => state.todoListRedux.columns);
    const columnModal = useSelector((state: State) => state.todoListRedux.columnModal);
    const [newColumnName, setNewColumnName] = useState<string>();

    const handleOnCloseColumn = () => {
        dispatch(setColumnModal(null));
    };

    useEffect(() => {
        setNewColumnName(columnModal?.label);
    }, [columnModal]);

    const handleOnSave = () => {
        if (newColumnName && columnModal) {
            const newColumn = {
                ...columnModal,
                label: newColumnName,
            };
            dispatch(
                setColumns(
                    columns.map((column: Column) =>
                        column.value === newColumn.value ? newColumn : column
                    )
                )
            );
            handleOnCloseColumn();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnName(e.target.value);
    };

    return (
        <Modal
            title="Column edition"
            open={columnModal !== null}
            onOk={handleOnSave}
            okText="Save"
            onCancel={handleOnCloseColumn}
            className="todo-list-redux-Column-modal"
        >
            <Input value={newColumnName} onChange={handleOnChange} />
        </Modal>
    );
};

export default ColumnModal;
