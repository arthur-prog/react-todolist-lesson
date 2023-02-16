import React from 'react';
import { List } from 'antd';
import { Item, Column } from '../TodoListRedux';
import ItemComp from './Item';
import Header from './Header';
import {useDispatch, useSelector} from "react-redux";
import {setColumnModal, setColumns, setItemModal, setItems} from "../TodoListReduxSlice";
import {Draggable} from "react-beautiful-dnd";

interface ColumnInterface {
    value: string;
    label: string;
    columnItems: Item[];
}

const ColumnComp = ({
    value,
    label,
    columnItems,
}: ColumnInterface) => {
    const dispatch = useDispatch();
    const columns = useSelector((state: any) => state.todoListRedux.columns);
    const items = useSelector((state: any) => state.todoListRedux.items);
    const handleOnDeleteColumn = (idToRemove: string) => {
        dispatch(setColumns(columns.filter(({value}: Column) => value !== idToRemove)));
        setItems(items.filter(({ columnId }: Item) => columnId !== idToRemove));
    };

    const handleOnDeleteItem = (idToRemove: string) => {
        dispatch(setItems(items.filter(({ id }: Item) => id != idToRemove)));
    };

    const handleOnReduxColumn = (idColumn: string) => {
        const column = columns.find(({value} : Column) => value === idColumn);

        if (column) {
            dispatch(setColumnModal(column));
        }
    };

    const handleOnReduxItem = (idItem: string) => {
        const item = items.find(({ id }: Item) => id === idItem);

        if (item) {
            dispatch(setItemModal(item));
        }
    };

    return (
            <List
                className="todo-list-redux-column"
                key={value}
                header={
                    <Header
                        label={label}
                        onReduxColumn={() => handleOnReduxColumn(value)}
                        onDeleteColumn={() => handleOnDeleteColumn(value)}
                    />
                }
                dataSource={columnItems}
                renderItem={({ label: itemLabel, id }, index) => (
                    <Draggable draggableId={id} index={index}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}
                                 style={provided.draggableProps.style}>
                                <ItemComp
                                    label={itemLabel}
                                    id={id}
                                    onDeleteItem={() => handleOnDeleteItem(id)}
                                    onReduxItem={() => handleOnReduxItem(id)}
                                />
                            </div>
                        )}
                    </Draggable>
                )}
            />
    );
};

export default ColumnComp;
