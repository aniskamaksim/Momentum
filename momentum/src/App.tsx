import React, {useState} from 'react';
import './App.css';
import {DateAndTime} from "./Components/DateAndTime";
import {Greeting} from "./Components/Greeting";
import {QuoteBlock} from "./Components/QuoteBlock";
import {Weather} from "./Components/Weather";
import {ToDo} from "./Components/ToDo";

export type WeatherType = {
    sky: string,
    temp: string,
    human: string,
    wind: string
}
export type TasksType = {
    taskId: string,
    taskTitle: string,
    taskStatus: boolean
}

function App() {
    const [date, setDate] = useState(new Date());
    const [weather, setWeather] = useState<WeatherType[]>(
        [{sky: "", temp: "", human: "", wind: ""}]
    )
    const [city, setCity] = useState<string>("Weather")
    // @ts-ignore
    const localStoredName = JSON.parse(localStorage.getItem('tasks'))
    const [tasks, setTasks] = useState<TasksType[]>(
        localStoredName ? localStoredName : []
    )
    localStorage.setItem('tasks', JSON.stringify(tasks))
    return (
        <>
            <div className={"weather_todo"}>
                <ToDo tasks={tasks} setTasks={setTasks}/>
                <Weather weather={weather} setWeather={setWeather} city={city} setCity={setCity}/>
            </div>
            <div className={"dateTime"}>
                <DateAndTime date={date} setDate={setDate}/>
                <Greeting date={date}/>
                <QuoteBlock/>
            </div>
        </>
    );
}

export default App;
