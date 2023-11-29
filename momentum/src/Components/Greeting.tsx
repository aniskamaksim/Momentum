import React, {memo, useCallback} from 'react';
import styled from "styled-components";
import {EditableSpan} from "./EditableSpan";
import {getTimeOfTheDay} from "../Assets/TS/logic";

type GreetingType = {
    date: Date;
}
export const Greeting: React.FC<GreetingType> = memo((
    {date}
) => {
    useCallback(() => {
        getTimeOfTheDay(date)
    }, [date]);

    const showGreetings = useCallback(() => {
        const nowIs = getTimeOfTheDay(date);
        return `Good ${nowIs}, `
    }, [date]);

    return (
        <DivWrapper>
            <GreetingPhrase> {showGreetings()}
                <EditableSpan/>
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
  font-size: 2em;
  font-weight: 600;
  color: white;
`;