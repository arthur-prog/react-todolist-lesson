import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Item } from '../TodoListRedux';
import {setItemModal, setItems} from "../TodoListReduxSlice";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";


const ItemModal = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: State) => state.todoListRedux.columns);
    const items = useSelector((state: State) => state.todoListRedux.items);
    const itemModal = useSelector((state: any) => state.todoListRedux.itemModal);
    const [newItemName, setNewItemName] = useState<string>();
    const [newItemColumn, setNewItemColumn] = useState<string>();

    const handleOnCloseItem = () => {
        dispatch(setItemModal(null));
    };

    useEffect(() => {
        setNewItemName(itemModal?.label);
        setNewItemColumn(itemModal?.columnId);
    }, [itemModal]);

    const handleOnSave = () => {
        if (newItemName && itemModal && newItemColumn) {
            const newItem = {
                ...itemModal,
                label: newItemName,
                columnId: newItemColumn,
            }
            dispatch(setItems(
                items.map((item: Item) => (item.id === newItem.id ? newItem : item))
            ));
            handleOnCloseItem();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    return (
        <Modal
            title="Item edition"
            open={itemModal !== null}
            onOk={handleOnSave}
            okText="Save"
            onCancel={handleOnCloseItem}
            className="todo-list-redux-item-modal"
        >
            <Input value={newItemName} onChange={handleOnChange} />
            <Select
                placeholder="Select column"
                onChange={handleOnCategoryChange}
                value={newItemColumn}
                options={columns}
            />
        </Modal>
    );
};

export default ItemModal;
