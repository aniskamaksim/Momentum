import React, {ChangeEvent, useState} from 'react';

async function getWeather(cityString: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityString}&lang=en&appid=7e3f19a944493dfca234ed69199dfbf1&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].description, data.main.temp);
}
export const Weather: React.FC = (
    {}
) => {
    const [weather, setWeather] = useState([
        {
            temp: "C",
            human: "%",
            wind: "ms"
        }
    ])
        let cityString = "";
    const changeWeatherHolder = (e: ChangeEvent<HTMLInputElement>) => {
        let city = e.currentTarget.value;
        cityString = `${city}`;
        console.log(cityString)
        let cityStringInput = getWeather(cityString);
        localStorage.setItem("city", cityString);
    }

    const onClickHandler = () => {
        getWeather(cityString)
        console.log(cityString)
        setWeather(weather)
    }
    return (
        <div>
        <input onChange={changeWeatherHolder} placeholder={"enter city"}/><button onClick={onClickHandler}>+</button>
            <div>{
                weather.map((e, key) => {
                return (
                    <div key={1}>
                        <li>{e.temp}</li>
                        <li>{e.wind}</li>
                        <li>{e.human}</li>
                    </div>
                )
                })
            }
                </div>
        </div>
    );
};