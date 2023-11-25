import React, {ChangeEvent} from 'react';
import {TasksType} from "../App";

type TasksPropsType = {
    tasks: TasksType,
    changeTaskStatus: (taskId: string, newTaskStatus: boolean) => void
    deleteTask: (taskId: string) => void
}
export const Tasks: React.FC<TasksPropsType> = (
    {tasks, changeTaskStatus, deleteTask}
) => {
    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newTaskStatus = event.currentTarget.checked;
        changeTaskStatus(tasks.taskId, newTaskStatus);
    }
    const deleteTaskHandler = () => {
        deleteTask(tasks.taskId)
    }
    return (
        <li key={tasks.taskId}>
            <span>{tasks.taskTitle}</span>
            <input type="checkbox"
                   checked={tasks.taskStatus}
                   onChange={onChangeStatusHandler}/>
            <button onClick={deleteTaskHandler}>del</button>
        </li>
    )
};