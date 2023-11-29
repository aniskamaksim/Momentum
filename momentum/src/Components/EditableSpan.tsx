import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";

export const EditableSpan: React.FC = () => {

    const [name, setName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const localStoredName = localStorage.getItem('name')

    useEffect(() => {
        localStoredName !== null && localStoredName ?
            setName(localStoredName) : setName("enter your name, pls");
    }, [name, localStoredName])

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        localStorage.setItem('name', e.currentTarget.value);
    }
    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter" && name.trim().length) {
            toggleEditMode();
        }
    }
    const toggleEditMode = () => {
        editMode ? setEditMode(false) : setEditMode(true);
    }
    return editMode ? <TextField
            id={"outlined-basic"}
            type={"text"}
            color={"primary"}
            variant={"standard"}
            size={"small"}
            inputProps={inputPropsStyle}
            value={localStoredName ? name : ""}
            onChange={onChangeNameHandler}
            onKeyDown={onKeyDownHandler}
            autoFocus onBlur={toggleEditMode}
        /> :
        <span onDoubleClick={toggleEditMode}>{name}{"."}</span>

};
const inputPropsStyle = {
    style: {width: "15rem", color: "white", fontSize: "2rem", fontWeight: "bold"}
};