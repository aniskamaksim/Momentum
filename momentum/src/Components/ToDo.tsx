import React, {ChangeEvent, memo, useState, KeyboardEvent} from 'react';
import {Tasks} from "./Tasks";
import {v1} from "uuid";
import {TasksType} from "../App";
import {Button, TextField} from "@mui/material";
import styled from "styled-components";

type TodoPropsType = {
    tasks: TasksType[],
    setTasks: (tasks: TasksType[]) => void
}
export const ToDo: React.FC<TodoPropsType> = memo((
    {tasks, setTasks}
) => {
    const [title, setTitle] = useState<string>("");
    const [textFieldValue, setTextFieldValue] = useState<string>("");

    const changeTasksStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks(tasks.map(e => e.taskId === taskId ? {...e, taskStatus: newTaskStatus} : e));
    }
    const addNewTask = (newTaskTitle: string) => {
        const newTask = {taskId: v1(), taskTitle: newTaskTitle, taskStatus: false};
        let copyTasks = [newTask, ...tasks];
        setTasks(copyTasks);
    }
    const createTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTextFieldValue(value)
        setTitle(value);
    }
    const onPressCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title.trim().length) {
            addNewTask(title);
            setTextFieldValue("");
        }
    }
    const deleteTask = (taskId: string) => {
        const copyTask = tasks.filter(e => e.taskId !== taskId)
        setTasks(copyTask)
    }
    const editTaskTitle = (taskId: string, newTaskTitle: string) => {
        setTasks(tasks.map(e => e.taskId === taskId ? {...e, taskTitle: newTaskTitle} : e));
            }
    //TODO: edit task Title /editable span already exist?
    return (
        <MainTodoDiv>
            <InputButtonTodo>
                <TextField onChange={createTaskHandler}
                           onKeyDown={onPressCreateTaskHandler}
                           id={"outlined-basic"}
                           placeholder={"Enter tasks here"}
                           variant={"standard"}
                           inputProps={inputPropsStyle}
                           value={textFieldValue}
                           sx={{padding: "0.3rem"}}
                />
                <Button variant="contained"
                        onClick={() => addNewTask(title)}
                        size={"medium"}>
                    To Do
                </Button>
            </InputButtonTodo>
            <TasksList>{tasks.length ?
                <div>
                    {tasks.map(e =>
                        <Tasks key={e.taskId}
                               tasks={e}
                               changeTaskStatus={changeTasksStatus}
                               deleteTask={deleteTask}
                               editTaskTitle={editTaskTitle}
                        />
                    )}</div>
                : ""}
            </TasksList>
        </MainTodoDiv>
    )
});
const inputPropsStyle = {
    style: {padding: "0.3rem", width: "15rem", color: "white", fontSize: "1.5rem", fontWeight: "300"}
};
const MainTodoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const InputButtonTodo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  padding: 0.5rem;
`
const TasksList = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  padding: 0.5rem;
`