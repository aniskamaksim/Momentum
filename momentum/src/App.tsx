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

function App () {
    const [date, setDate] = useState(new Date());
    const [weather, setWeather] = useState<WeatherType[]>([
        {
            sky: "",
            temp: "",
            human: "",
            wind: ""
        }]
    )

    return (
        <>
            <div className={"weather_todo"}>
                <ToDo/>
                <Weather
                    weather={weather}
                    setWeather={setWeather}
                    />
            </div>
        <div className={"dateTime"}>
            <DateAndTime
                date={date}
                setDate={setDate}
            />
            <Greeting
                date={date}/>
            <QuoteBlock />
        </div>
        </>
    );
}

export default App;
