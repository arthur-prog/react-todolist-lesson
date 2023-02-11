import React, {useState} from 'react';
import './TodoListEdit.css';
import Column from "./Column";
import AddColumn from "./AddColumn";
import AddItem from "./AddItem";
import ColumnModal from "./ColumnModal";
import ItemModal from "./ItemModal";

export interface ColumnInterface {
    value: string;
    label: string;
}

export interface ItemInterface {
    id: string;
    columnId: string;
    label: string;
}


const TodoListEdit = () => {
    const [columns, setColumns] = useState<ColumnInterface[]>([]);
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [newColumnName, setColumnName] = useState<string>();
    const [newItemColumn, setNewItemColumn] = useState<string>();
    const [isModalColumnOpen, setIsModalColumnOpen] = useState(false);
    const [isModalItemOpen, setIsModalItemOpen] = useState(false);
    const [columnNameModal, setColumnNameModal] = useState<string>('');
    const [selectedColumnModal, setSelectedColumnModal] = useState<ColumnInterface>();
    const [itemNameModal, setItemNameModal] = useState<string>('');
    const [selectedItemModal, setSelectedItemModal] = useState<ItemInterface>();

    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnColumnNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setColumnName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    const handleOnClickNewColumn = () => {
        if (newColumnName) {
            const newColumn = {
                value: randomId(),
                label: newColumnName,
            };

            setColumns([...columns, newColumn]);
            setColumnName(undefined);
        }
    };

    const handleOnClickNewItem = () => {
        if (newItemColumn) {
            const newItem = {
                id: randomId(),
                label: newItemName,
                columnId: newItemColumn,
            };

            setItems([...items, newItem]);

            setNewItemName('');
            setNewItemColumn(undefined);
        }
    };

    const getColumnItems = (columnIdSelected: string) => {
        return items.filter(({columnId}) => columnId === columnIdSelected);
    };

    const handleOnDeleteColumn = (idToRemove: string) => {
        setColumns(columns.filter(({value}) => value !== idToRemove));
        const thisItems = getColumnItems(idToRemove);
        const newItems: ItemInterface[] = [];
        items.forEach(function (item) {
            if (!thisItems.includes(item)) {
                newItems.push(item);
            }
        });
        setItems(newItems);
    };

    const handleOnDeleteItem = (idToRemove: string) => {
        setItems(items.filter(({id}) => id !== idToRemove));
    };


    const showModalColumn = (column: ColumnInterface) => {
        setColumnNameModal(column.label);
        setSelectedColumnModal(column);
        setIsModalColumnOpen(true);
    };

    const handleOkColumn = () => {
        if (columnNameModal) {
            const columnIndex = columns.findIndex((column => column == selectedColumnModal))
            columns[columnIndex].label = columnNameModal
            setColumns(columns);
            setIsModalColumnOpen(false);
        }
    };

    const handleCancelColumn = () => {
        setIsModalColumnOpen(false);
    };

    const handleOnColumnNameModalChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setColumnNameModal(e.target.value);
    };



    const handleOnSelectColumnNameModalChange = (newValue: string) => {
        setColumnNameModal(newValue);
    };

    const showModalItem = (column: ColumnInterface, item: ItemInterface) => {
        setColumnNameModal(column.value);
        setSelectedColumnModal(column);
        setItemNameModal(item.label);
        setSelectedItemModal(item);
        setIsModalItemOpen(true);
    };

    const handleOkItem = () => {
        if (columnNameModal && itemNameModal) {
            const itemIndex = items.findIndex((item => item == selectedItemModal))
            items[itemIndex].label = itemNameModal
            items[itemIndex].columnId = columnNameModal
            setItems(items);

            setIsModalItemOpen(false);
        }
    };

    const handleCancelItem = () => {
        setIsModalItemOpen(false);
    };

    const handleOnItemNameModalChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setItemNameModal(e.target.value);
    };


    return (
        <div className="todo-list-edit">

            <AddColumn columnName={newColumnName} handleOnColumnNameChange={handleOnColumnNameChange}
                       handleOnClickNewColumn={handleOnClickNewColumn}/>

            <AddItem itemName={newItemName} itemColumn={newItemColumn} columns={columns}
                     handleOnItemNameChange={handleOnItemNameChange} handleOnCategoryChange={handleOnCategoryChange}
                     handleOnClickNewItem={handleOnClickNewItem}/>

            <div className="todo-list-edit-columns">
                {columns.map((column) => {
                    const columnItems = getColumnItems(column.value);

                    return (
                        <Column
                            column={column}
                            key={column.value}
                            items={columnItems}
                            label={column.label}
                            handleOnDeleteItem={handleOnDeleteItem}
                            handleOnDeleteColumn={handleOnDeleteColumn}
                            showColumnModal={showModalColumn}
                            showItemModal={showModalItem}
                        />
                    );
                })}
                <ColumnModal isModalOpen={isModalColumnOpen} handleOk={handleOkColumn} handleCancel={handleCancelColumn}
                             handleOnColumnNameChange={handleOnColumnNameModalChange} columnName={columnNameModal}/>
                <ItemModal isModalOpen={isModalItemOpen} handleOk={handleOkItem} handleCancel={handleCancelItem}
                           columnName={columnNameModal} itemName={itemNameModal}
                           handleOnSelectColumnNameChange={handleOnSelectColumnNameModalChange}
                           handleOnItemNameChange={handleOnItemNameModalChange} columns={columns}/>
            </div>
        </div>
    )
        ;
};
export default TodoListEdit;
