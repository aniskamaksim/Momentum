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
        const newName = e.currentTarget.value;
        setName(newName);
        localStorage.setItem('name', e.currentTarget.value);
    }
    const onKeyDownHandler = (e: KeyboardEvent) => {
        e.key === "Enter" && toggleEditMode();
    }
    const toggleEditMode = () => {
        if (name.trim().length) {
            setEditMode(!editMode)
        } else {
            setName("enter your name, pls");
            setEditMode(!editMode);
        }
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