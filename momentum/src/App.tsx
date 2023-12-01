import React, {useState, useEffect} from 'react';
import './App.css';
import {DateAndTime} from "./Components/DateAndTime";
import {Greeting} from "./Components/Greeting";
import {QuoteBlock} from "./Components/QuoteBlock";
import {Weather} from "./Components/Weather";
import {ToDo} from "./Components/ToDo";
import {changeBgToNext, changeBgToPrev, setBg} from "./Assets/TS/logic";

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
        [{sky: "", temp: "", human: "", wind: ""}])
    const [city, setCity] = useState<string>("Weather")
    // @ts-ignore
    const localStoredName = JSON.parse(localStorage.getItem('tasks'))
    const [tasks, setTasks] = useState<TasksType[]>(
        localStoredName ? localStoredName : []
    )
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])
    useEffect(() => {
        setBg();
    }, [])
    return (
        <>
            <div className={"appDiv"}>
                <div className={"weather_todo"}>
                    <ToDo tasks={tasks} setTasks={setTasks}/>
                    <Weather weather={weather} setWeather={setWeather} city={city} setCity={setCity}/>
                </div>
                <div className={"centralBlock"}>
                    <div className={"arrowDiv"}>
                        <svg className={'arrow_left'} version="1.1" xmlns="http://www.w3.org/2000/svg" width="64"
                             height="64" viewBox="0 0 64 64">
                            <title>arrow_back_ios</title>
                            <path fill="#fff"
                                  d="M31.125 10.375l-21.625 21.625 21.625 21.625-4.75 4.75-26.375-26.375 26.375-26.375z"
                                  onClick={() => changeBgToPrev()}></path>

                        </svg>
                    </div>
                    <div className={"dateTime"}>
                        <DateAndTime date={date} setDate={setDate}/>
                        <Greeting date={date}/>
                    </div>
                    <div className={"arrowDiv"}>
                        <svg className={'arrow_right'} version="1.1" xmlns="http://www.w3.org/2000/svg" width="64"
                             height="64" viewBox="0 0 64 64">
                            <title>arrow_forward_ios</title>
                            <path fill="#fff"
                                  d="M15.625 11l5.75-5.625 26.625 26.625-26.625 26.625-5.75-5.625 21.125-21z"
                                  onClick={() => changeBgToNext()}></path>
                        </svg>
                    </div>
                </div>
                <div className={"quote"}>
                    <QuoteBlock/>
                </div>
            </div>
        </>
    );
}

export default App;


