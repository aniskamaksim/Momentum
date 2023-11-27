import React, {ChangeEvent, memo, useState, KeyboardEvent, useCallback, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import {TextField} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type WeatherType = {
    sky: string,
    temp: string,
    human: string,
    wind: string
}
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

    const setLocaleStorage = (nameParam: string) => {
        localStorage.setItem('city', nameParam)
    }
    const localStoredName = localStorage.getItem('city')
    useEffect(() => {
        setCity(localStoredName ? localStoredName : "")
    }, [city, setCity, localStoredName])
    useEffect(() => {
        getWeather(city)
    }, [city])

    async function getWeather(city: string) {
        const localStoredName = localStorage.getItem('city')
        const cityString = localStoredName ? `${localStoredName}` : `${city}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityString}&lang=en&appid=7e3f19a944493dfca234ed69199dfbf1&units=metric`;
        const res = await axios(url);
        // console.log(res)
        const currTemp = "TEMP: " + res.data.main.temp + "C";
        const currHumidity = "HUMID: " + res.data.main.humidity + "%";
        const currWind = "WIND: " + res.data.wind.speed + "ms";
        const currSky = res.data.weather[0].description;
        let copyWeather = weather.map(e => ({...e, sky: currSky, temp: currTemp, wind: currWind, human: currHumidity}))
        setWeather(copyWeather);
        const iconId = res.data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconId}.png`;
        setIcon(iconUrl);
    }

    const changeWeatherHolder = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let cityString = e.currentTarget.value;
        setCity(cityString)
        setInputValue(cityString)
        setLocaleStorage(cityString)
    }, [setCity])

    const onClickHandler = () => {
        getWeather(city);
        setInputValue("")
    }

    const onKeyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }
    return (
        <>
            <LiDiv>
                <InputButton>
                    <TextField
                        color="primary"
                        id="outlined-basic"
                        label={"Please enter city here"}
                        variant="outlined"
                        onChange={changeWeatherHolder}
                        onKeyDown={onKeyHandler}
                        size={"small"}
                        sx={{padding: "0.3rem"}}
                        value={inputValue}
                        focused={inputValue.length > 0}
                    />
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon onClick={onClickHandler}/>
                    </Fab>
                </InputButton>
                <CityString>{city}</CityString>
                <div>
                    <img src={icon} alt={""}/>
                </div>
                <div>{
                    weather.map((e) => {
                        return (
                            <div key={1}>
                                <li>{e.sky}</li>
                                <li>{e.temp}</li>
                                <li>{e.wind}</li>
                                <li>{e.human}</li>
                            </div>
                        )
                    })
                }
                </div>
            </LiDiv>
        </>
    )
});
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
`