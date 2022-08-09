import React, { useState } from 'react'
import styled from 'styled-components';
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

const Div = styled.div`
    margin: 20px 0,
    display: flex,
    flexDirection: row,
    width:80%  
`;
export default function AddTodo(props) {
    const [task, setTask] = useState("")
    const handleInputChange = (e) => {
        setTask(e.target.value);
    }
    const handleClick = () => {
        if(task){
            props?.addToTodo(task);
            setTask('');
        }
    }

    const handleAddTodo = (taskName) => {
        if(taskName){
            props?.addToTodo(taskName);
            setTask('');
        }
    }
  return (
    <Div>
        <TextInput id="add-task" name="task" value={task} onChange={handleInputChange} addTodo={handleAddTodo}/>
        <Button primary color="blue" onClick={handleClick}>
            Add Task
        </Button>
    </Div>
  )
}
