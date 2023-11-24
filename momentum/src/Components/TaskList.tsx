import React, {useState} from 'react';
import {v1} from "uuid";
export type TaskListType = {
    taskId: string,
    taskTitle: string,
    taskStatus: boolean
}
export const TaskList: React.FC<TaskListType> = () => {

    const taskId = v1();
    const [tasks, setTasks] = useState<TaskListType[]>(
        [
            {taskId: taskId, taskTitle: "TestTitle", taskStatus: false},
            {taskId: taskId, taskTitle: "TestTitle2", taskStatus: false}
        ]
    )

    return (
        <div>

        </div>
    );
};
