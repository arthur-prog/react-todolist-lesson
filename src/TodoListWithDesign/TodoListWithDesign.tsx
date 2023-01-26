import React, { useState } from 'react';
import './TodoListEdit.css';
import { List, Input, Button, Select } from 'antd';

interface ListItem {
    id: string;
    label: string;
}

interface Task {
    id: string;
    name: string;
    categ: string;
}

const TodoListWithDesign = () => {

    const { Option } = Select;

    const [taskList, setTaskList] = useState<Task[]>([]);

    const [listCateg, setListCateg] = useState<ListItem[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemCategory, setNewItemCategory] = useState<string>('');
    const [itemCategory, setItemCategory] = useState<string>('');
    const randomId = () => (Math.random() + 1).toString(36).substring(7);

    const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemCategory(e.target.value);
    };

    const handleOnClickColumn = () => {
        const newItem = {
            id: randomId(),
            label: newItemCategory,
        };
        setListCateg([...listCateg, newItem]);
        setNewItemCategory('');
    }

    const handleOnClickTask = () => {
        const newTask = {
            id: randomId(),
            name: newItemName,
            categ: itemCategory,
        };

        setTaskList([...taskList, newTask]);

        setNewItemName('');
        setItemCategory('');
    };

    const handleOnClickDeleteTask = (id: string) => {
        const newTaskList = taskList.filter((task) => task.id !== id);
        setTaskList(newTaskList);
    };

    const handleChangeColumn = (value: string) => {
        setItemCategory(value)
    };

    return (
        <>
            <div className="row">
                <Input
                    onChange={handleOnCategoryChange}
                    placeholder="Column name"
                    value={newItemCategory}
                />
                <Button
                    disabled={!(newItemCategory.length > 0)}
                    onClick={handleOnClickColumn}
                >Add Column</Button>
            </div>
            <div className="row">
                    <Input
                        onChange={handleOnNameChange}
                        placeholder="Item name"
                        value={newItemName}
                    />
                    <Select
                        value={itemCategory}
                        style={{ width: 120 }}
                        onChange={handleChangeColumn}
                    >
                        {listCateg.map((categ) => (
                            <Option key={categ.id} value={categ.label}>
                                {categ.label}
                            </Option>
                            ))}
                    </Select>
                    <Button
                        disabled={!(newItemName.length > 0 && itemCategory !== "")}
                        onClick={handleOnClickTask}
                    >Add Item</Button>
            </div>
            <div className="row">
                {listCateg.map(({id, label}) => (
                    <div className="col"
                         key={id}
                    >
                        <List
                            header={<div>{label}</div>}
                            bordered
                            >
                            {taskList.map((task) => {
                                if(task.categ === label){
                                    return <div>
                                        <div key={task.id} className="row">
                                            <List.Item>
                                                {task.name}
                                            </List.Item>
                                            <Button
                                                className="delete"
                                                type="primary"
                                                danger
                                                onClick={() => handleOnClickDeleteTask(task.id)}
                                            >
                                                X</Button>
                                        </div>
                                    </div>
                                }
                            })}
                        </List>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TodoListWithDesign;
