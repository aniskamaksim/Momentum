import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import styled from "styled-components";
import {EditableSpan} from "./EditableSpan";

type GreetingType = {
    date: Date;
}
export const Greeting: React.FC<GreetingType> = memo((
    {date}
) => {
    const [value, setValue] = useState("")

    const getTimeOfTheDay = useCallback(() => {
        const hours = date.getHours();
        return hours >= 0 && hours < 6 ? 'night' :
           hours >= 6 && hours < 12 ? 'morning' :
               hours >= 12 && hours < 18 ? 'afternoon' : 'evening';
        }, [date]);

    const showGreetings = useCallback(() => {
        const nowIs = getTimeOfTheDay();
        return `Good ${nowIs}, `
    }, []);

    return (
        <DivWrapper>
           <GreetingPhrase> {showGreetings()}
               <EditableSpan />
           </GreetingPhrase>
        </DivWrapper>
    );
});
const DivWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;    
`;
const GreetingPhrase = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 3em;
  font-weight: 600;
  color: white;
`;