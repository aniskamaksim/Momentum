import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksType} from "../App";
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';


type TasksPropsType = {
    tasks: TasksType,
    changeTaskStatus: (taskId: string, newTaskStatus: boolean) => void
    deleteTask: (taskId: string) => void
    editTaskTitle: (taskId: string, newTaskTitle: string) => void
}
export const Tasks: React.FC<TasksPropsType> = (
    {tasks, changeTaskStatus, deleteTask, editTaskTitle}
) => {
    const oldTitle = tasks.taskTitle
    const [title, setTitle] = useState<string>(oldTitle)
    console.log(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newTaskStatus = event.currentTarget.checked;
        changeTaskStatus(tasks.taskId, newTaskStatus);
    }
    const deleteTaskHandler = () => {
        deleteTask(tasks.taskId)
    }
    const changeModeHandler = () => {
        setEditMode(!editMode)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.currentTarget.value
        setTitle(newTitle)
    }
    const changeTaskTitle = () => {
        editTaskTitle(tasks.taskId, title)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && title.trim().length) {
            changeTaskTitle();
            setEditMode(false);
        }
    }
    //TODO: make editable span one for all
    return (
        <TasksList key={tasks.taskId}>
            <TaskRow>
            <span onDoubleClick={changeModeHandler}
                  onBlur={changeModeHandler}>{
                editMode ? <input type="text"
                                  value={title}
                                  autoFocus={true}
                                  onChange={changeTitleHandler}
                                  onBlur={changeTaskTitle}
                                  onKeyDown={onKeyDownHandler}
                /> : tasks.taskStatus ?
                    <span style={{textDecoration: "line-through"}}>{title}</span> :
                    <span>{title}</span>
            }
            </span>
            </TaskRow>
            <TaskButtons>
                <Checkbox
                    checked={tasks.taskStatus}
                    onChange={onChangeStatusHandler}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize={"medium"} color={"primary"} onClick={deleteTaskHandler}/>
                </IconButton>
            </TaskButtons>
        </TasksList>
    )
};
const TasksList = styled.div`
  display: flex;
  flex-direction: row;
  width: 20rem;
  color: #F0F0F0;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`
const TaskRow = styled.div`
  width: 100%;
  display: flex;
`
const TaskButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`