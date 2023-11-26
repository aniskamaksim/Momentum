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
        let copyTasks = [...tasks, newTask];
        setTasks(copyTasks);
    }
    const createTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(e.currentTarget.value);
        setTitle(textFieldValue)
    }
    const onPressCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && textFieldValue.trim().length) {
            addNewTask(title);
            setTextFieldValue("");
        }
    }
    const deleteTask = (taskId: string) => {
        const copyTask = tasks.filter(e => e.taskId !== taskId)
        setTasks(copyTask)
    }
    const editTaskTitle = (taskId: string, newTaskTitle: string) => {
        tasks.filter(e => e.taskId === taskId ? {...e, taskTitle: newTaskTitle} : e)
        setTasks(tasks)
    }

    //TODO: edit task Title /editable span already exist?

    return (
        <MainTodoDiv>
            <InputButtonTodo>
                <TextField onChange={createTaskHandler}
                           onKeyDown={onPressCreateTaskHandler}
                           size={"small"}
                           value={textFieldValue}
                           sx={{padding: "0.3rem"}}
                />
                <Button variant="contained"
                        onClick={() => addNewTask(title)}
                        size={"small"}>
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
  width: 50%;
  flex-direction: row;
  padding: 0.5rem;
`