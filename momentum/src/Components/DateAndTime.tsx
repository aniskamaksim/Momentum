import React, {memo, useEffect, useState} from 'react';
import styled from "styled-components";

type DateAndTimeType = {
    date: Date
    setDate: (date: Date)=>void
}
export const DateAndTime: React.FC<DateAndTimeType> = memo(
    (
        {date, setDate}
) => {
        // const [date, setDate] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>setDate(new Date()), 1000)
        return ()=> clearInterval(timer)
    }, [date])

    return (
        <DivWrapper>
            <ClockDiv> {date.toLocaleTimeString("en-GB")} </ClockDiv>
            <DateDiv> {date.toLocaleDateString("en-En", {
                month: "long",
                day: "numeric",
                weekday: "long"})} </DateDiv>
        </DivWrapper>
    );
});
const ClockDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 8em;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2em;
`;
const DateDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8em;
  color: white;
`;
const DivWrapper = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;    
`;