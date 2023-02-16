import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store2';
import {Select} from "antd";
import {setName} from "./Example2Slice";


import React, {useState} from "react";
import ReactDOM from "react-dom";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


export default () => {
    return (
        <Provider store={store}>
            <QuoteApp/>
        </Provider>
    );
};

const QuoteApp = () => {

    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: any = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };
    const grid = 8;
    const getItemStyle = (isDragging: any, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });
    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    const [state, setState] = useState(["1", "2", "3"]);

    function onDragEnd(result: any) {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState: any = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }

    }

    return <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'0'}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}>
                        <Draggable draggableId={'1'} index={1}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}{...provided.draggableProps}
                                     {...provided.dragHandleProps} style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                    <p>coucou1</p>
                                </div>
                            )}
                        </Draggable>
                        <Draggable draggableId={'2'} index={2}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}{...provided.draggableProps}
                                     {...provided.dragHandleProps} style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                    <p>coucou2</p>
                                </div>
                            )}
                        </Draggable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </>;
}