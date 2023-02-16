import React, { useState } from 'react';
import AddColumn from './AddColumn/AddColumn';
import AddItem from './AddItem';
import ColumnComp from './Column';
import ColumnModal from './ColumnModal';
import ItemModal from './ItemModal';
import './TodoListRedux.css';
import {Provider, useDispatch, useSelector} from "react-redux";
import {setColumnModal, setColumns, setItemModal, setItems} from "./TodoListReduxSlice";
import {State} from "./store";
import ReactDOM from "react-dom";
import {App} from "antd";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

export interface Column {
    value: string;
    label: string;
}

export interface Item {
    id: string;
    columnId: string;
    label: string;
}

const TodoListRedux = () => {
    const dispatch = useDispatch();
    const columns = useSelector((state: State) => state.todoListRedux.columns);
    const items = useSelector((state: State) => state.todoListRedux.items);

    const getColumnItems = (columnIdSelected: string) => {
        return items.filter(({ columnId }: Item) => columnId === columnIdSelected);
    };

    function onDragEnd(result: any) {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        const newItems = items.filter(({columnId}: Item) => columnId == source.droppableId);
        const newItem: Item = {
            id: newItems[source.index].id,
            label: newItems[source.index].label,
            columnId: destination.droppableId,
        };
        dispatch(setItems(items.map((item: Item) => (item.id === newItem.id ? newItem : item))));
    }

    return (
            <div className="todo-list-redux">
                <AddColumn />
                <AddItem />
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="todo-list-redux-columns">
                        {columns.map((column: Column) => {
                            const columnItems = getColumnItems(column.value);

                            return (
                                <Droppable key={column.value} droppableId={column.value}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} style={{width:"100%"}}{...provided.droppableProps}>
                                            <ColumnComp
                                                value={column.value}
                                                label={column.label}
                                                columnItems={columnItems}
                                            />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            );
                        })}
                    </div>
                </DragDropContext>
                <ItemModal />
                <ColumnModal />
            </div>
    );
};

export default TodoListRedux;
