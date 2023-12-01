import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksType} from "../App";
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {TextField} from "@mui/material";

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
    const [editMode, setEditMode] = useState<boolean>(false)
    const incorrectTitle = title.trim().length === 0;

    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newTaskStatus = event.currentTarget.checked;
        changeTaskStatus(tasks.taskId, newTaskStatus);
    }
    const deleteTaskHandler = () => {
        deleteTask(tasks.taskId)
    }
    const changeModeHandler = () => {
        if (!incorrectTitle) {
            setEditMode(!editMode)
        } else {
            setTitle(oldTitle);
            setEditMode(!editMode);
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.currentTarget.value;
        setTitle(newTitle);
    }
    const editTaskTitleHandler = (title: string) => {
        editTaskTitle(tasks.taskId, title);
    }
    const onKeyDownHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            editTaskTitleHandler(title);
            changeModeHandler();
        }
    }
//TODO: tasklist from/to localStorage put here!
//TODO: make editable span one for all
    return (
        <TasksList key={tasks.taskId}>
            <TaskRow>
            <span onDoubleClick={changeModeHandler}
                  onBlur={changeModeHandler}>{
                editMode ? <TextField
                    type="text"
                    variant={'standard'}
                    value={title}
                    autoFocus={true}
                    onChange={onChangeHandler}
                    inputProps={inputPropsStyle}
                    // onBlur={onChangeHandler}
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
                <IconButton aria-label="delete" size="small" onClick={deleteTaskHandler}>
                    <DeleteIcon fontSize={"medium"} color={"primary"}/>
                </IconButton>
            </TaskButtons>
        </TasksList>
    )
};
const inputPropsStyle = {
    style: {padding: "0.3rem", width: "15rem", color: "white", fontSize: "1.4rem", fontWeight: "300"}
};
const TasksList = styled.div`
  display: flex;
  flex-direction: row;
  width: 50rem;
  color: #F0F0F0;
  font-size: 1.4rem;
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