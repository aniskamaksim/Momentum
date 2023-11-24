import React, {ChangeEvent, KeyboardEvent, memo, useEffect, useState} from 'react';
import "./Greeting.css"

export const EditableSpan: React.FC = memo(() => {
    const [name, setName] = useState('[ENTER NAME]');
    let [editMode, setEditMode] = useState(false);

    const setLocaleStorage = (nameParam: string) => {
        localStorage.setItem('name', nameParam)
    }
    useEffect(() => {
        const localStoredName = localStorage.getItem('name')
        setName(localStoredName ? localStoredName : "[ENTER PLS]")
    }, [])

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        console.log(newName, name)
        if(newName.trim().length == 0) {
            setName("[ENTER NAME]")
        } else {
            setName(newName);
            setLocaleStorage(newName)
        }
    }
    const enterEnterKey = (e: KeyboardEvent)=> {
        if(e.key === "Enter") {
            setEditMode(false);
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
        setName("");
    }
    const activateViewMode = () => {
        setEditMode(false);
    }

    return editMode ? <input
            type={"text"}
            value={name}
            onChange={changeTitle}
            onKeyDown={enterEnterKey}
            autoFocus onBlur={activateViewMode}
        /> :
        <span onDoubleClick={activateEditMode}>{name}</span>

});