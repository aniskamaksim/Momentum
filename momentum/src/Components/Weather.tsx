import React, {ChangeEvent, memo, useState, KeyboardEvent, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import {TextField} from "@mui/material";
import {WeatherType} from "../App";

type WeatherPropsType = {
    weather: WeatherType[],
    setWeather: (weather: WeatherType[]) => void,
    city: string,
    setCity: (city: string) => void
}
export const Weather: React.FC<WeatherPropsType> = memo((
    {weather, setWeather, city, setCity}
) => {
    const [icon, setIcon] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")
    const localStoredName = localStorage.getItem('city')

    useEffect(() => {
        getWeather(city)
    }, [city])

    async function getWeather(city: string) {
        const localStoredName = localStorage.getItem('city')
        const cityString = localStoredName ? `${localStoredName}` : `${city}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityString}&lang=en&appid=7e3f19a944493dfca234ed69199dfbf1&units=metric`;
        const res = await axios(url);
        try {
            const currTemp = "TEMP: " + res.data.main.temp + "C";
            const currHumidity = "HUMID: " + res.data.main.humidity + "%";
            const currWind = "WIND: " + res.data.wind.speed + "ms";
            const currSky = res.data.weather[0].description;
            let copyWeather = weather.map(e => ({
                ...e,
                sky: currSky,
                temp: currTemp,
                wind: currWind,
                human: currHumidity
            }))
            setWeather(copyWeather);
            const iconId = res.data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconId}.png`;
            setIcon(iconUrl);
        } catch (err) {
            new Error("Enter correct city")
        }
    }

    const changeWeatherHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const cityString = e.currentTarget.value;
        setInputValue(cityString)
    }
    const onKeyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            localStorage.setItem("city", inputValue)
            setCity(inputValue);
            setInputValue("");
        }
    }
    const cityName = localStoredName ? localStoredName : "Weather";
    return (
        <>
            <LiDiv>
                <InputButton>
                    <TextField
                        color={"success"}
                        id={"outlined-basic"}
                        placeholder={"Enter city here"}
                        variant={"standard"}
                        onChange={changeWeatherHandler}
                        onKeyDown={onKeyHandler}
                        size={"small"}
                        inputProps={inputPropsStyle}
                        value={inputValue}
                        focused={inputValue.length > 0}
                    />
                </InputButton>
                <CityString>{cityName}</CityString>
                <WeatherData>{
                    weather.map((e) => {
                        return (
                            <div key={1}>
                                {icon !== "" ? <img src={icon} alt={"icon weather"}/> : ""}
                                <li>{e.sky}</li>
                                <li>{e.temp}</li>
                                <li>{e.wind}</li>
                                <li>{e.human}</li>
                            </div>
                        )
                    })
                }
                </WeatherData>
            </LiDiv>
        </>
    )
});
const inputPropsStyle = {
    style: {padding: "0.3rem", width: "15rem", color: "white", fontSize: "1.5rem", fontWeight: "300"}
};
const LiDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-end;
  padding: 0.5rem;
`
const InputButton = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: flex-end;
`
const CityString = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  justify-content: flex-end;
  width: 50%;
  color: white;
  padding-right: 0.5rem;
  text-shadow: 0 4px 3px rgba(0, 0, 0, 0.4),
  0 8px 13px rgba(0, 0, 0, 0.1),
  0 18px 23px rgba(0, 0, 0, 0.1);
`
const WeatherData = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem;
`