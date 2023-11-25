import React, {ChangeEvent, memo, useState, KeyboardEvent} from 'react';
import {Tasks} from "./Tasks";
import {v1} from "uuid";
import {TasksType} from "../App";

type TodoPropsType = {
    tasks: TasksType[],
    setTasks: (tasks: TasksType[]) => void
}
export const ToDo: React.FC<TodoPropsType> = memo((
    {tasks, setTasks}
) => {
    const [title, setTitle] = useState<string>("");
    const changeTasksStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks(tasks.map(e => e.taskId === taskId ? {...e, taskStatus: newTaskStatus} : e));
    }
    const createTask = (newTaskTitle: string) => {
        const newTask = {taskId: v1(), taskTitle: newTaskTitle, taskStatus: false};
        let copyTasks = [...tasks, newTask];
        setTasks(copyTasks);
    }
    const createTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onPressCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && title.trim().length) {
            createTask(title);
        }
    }
    const deleteTask = (taskId: string) => {
        const copyTask = tasks.filter(e => e.taskId !== taskId)
        setTasks(copyTask)
    }

    //TODO: edit task Title /editable span already exist?

    return (
        <>
            <input type={"text"}
                   onChange={createTaskHandler}
                   onKeyDown={onPressCreateTaskHandler}>
            </input>
            <button onClick={() => createTask(title)}>+</button>
            <div>{
                tasks.map(e =>
                    <Tasks key={e.taskId}
                           tasks={e}
                           changeTaskStatus={changeTasksStatus}
                           deleteTask={deleteTask}
                    />
                )}
            </div>
        </>
    )
});