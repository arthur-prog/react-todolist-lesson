import React, {useEffect, useState} from 'react';

const options = ['To do', 'In progress', 'Done'];
const TodoListBasic = () => {
    const [name, setName] = useState<string>();
    const [option, setOption] = useState<string>("To do");
    const [listToDo, setListToDo] = useState<string[]>([]);
    const [listInProgress, setListInProgress] = useState<Array<string>>([]);
    const [listDone, setListDone] = useState<Array<string>>([]);


    const handleSubmit = () => {
        if (name != null) {
            if (option === "To do") {
                setListToDo([...listToDo, name]);
            } else if (option === "In progress") {
                setListInProgress([...listInProgress, name]);
            } else {
                setListDone([...listDone, name]);
            }
        }
        setName("");
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value);
    }

    return <div>
            <input onChange={handleChangeName} type="text" value={name} />

            <select onChange={handleChangeOption}>
                {
                    options.map(option => (
                        <option value={option} key={option}>{option}</option>
                    ))
                }
            </select>

            <button onClick={handleSubmit}>Add to list</button>

            <table style={{textAlign: "center"}}>
                <td style={{padding: '10px'}}>
                    <tr>To do</tr>
                    {
                        listToDo.map(task => (
                            <tr key={task}>{task}</tr>
                        ))
                    }
                </td>
                <td style={{padding: '10px'}}>
                    <tr>In progress</tr>
                    {
                        listInProgress.map(task => (
                            <tr key={task}>{task}</tr>
                        ))
                    }
                </td>
                <td style={{padding: '10px'}}>
                    <tr>Done</tr>
                    {
                        listDone.map(task => (
                            <tr key={task}>{task}</tr>
                        ))
                    }
                </td>
            </table>
    </div>;
};



export default TodoListBasic;
