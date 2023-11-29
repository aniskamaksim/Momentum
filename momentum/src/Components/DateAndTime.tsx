import React, {useEffect} from 'react';
import styled from "styled-components";

type DateAndTimeType = {
    date: Date
    setDate: (date: Date) => void
}
export const DateAndTime: React.FC<DateAndTimeType> = (
    {date, setDate}
) => {

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return () => clearInterval(timer)
    }, [setDate, date])

    return (
        <DivWrapper>
            <ClockDiv> {date.toLocaleTimeString("en-GB").slice(0, -3)} </ClockDiv>
            <DateDiv> {date.toLocaleDateString("en-En", {
                month: "long",
                day: "numeric",
                weekday: "long"
            })} </DateDiv>
        </DivWrapper>
    );
};
const ClockDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 10em;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2em;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
  0 8px 13px rgba(0, 0, 0, 0.1),
  0 18px 23px rgba(0, 0, 0, 0.1);
`;
const DateDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 2em;
  color: white;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
  0 8px 13px rgba(0, 0, 0, 0.1),
  0 18px 23px rgba(0, 0, 0, 0.1);
`;
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;