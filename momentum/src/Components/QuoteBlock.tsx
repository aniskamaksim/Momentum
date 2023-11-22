import React, {memo, useEffect, useState} from 'react';
import {getRandom} from "../Assets/TS/logic";
import styled from "styled-components";
import reload from "../Assets/Img/reload.svg";
import axios from "axios";

type QuoteType = {
    quote: string,
    author: string
}
type QuoteBlockType = {}
//TODO: win this f***ng promises!
export const QuoteBlock: React.FC<QuoteBlockType> = memo((
    {}
) => {

    const [currentQuote, setCurrentQuote] = useState("Every clever word comes from the stupidity")
    const [currentAuthor, setCurrentAuthor] = useState('Me')

    const getRandom = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    let randomNum = getRandom(1, 102);
    console.log("rnNum = " + randomNum)

    const fetchQuote = async () => {
        const result = await axios(
            'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        );
        const quote = result.data.quotes[randomNum].quote;
        const author = result.data.quotes[randomNum].author;
        setCurrentQuote(quote);
        setCurrentAuthor(author);
    };

    const changeResult = () => {
        let value = fetchQuote();
        return value
    }

    return (
        <>
            <ImgDiv><img src={reload} alt="Your SVG here" onClick={() => changeResult()}/></ImgDiv>
            <QuoteDiv>{currentQuote}</QuoteDiv>
            <AuthorDiv>{currentAuthor}</AuthorDiv>
        </>
    );
});
const ImgDiv = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
  cursor: pointer;
`;
const QuoteDiv = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  text-align: center;
  color: white;
  margin-bottom: 0.2em;
  margin-top: 2em;
`;
const AuthorDiv = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  text-align: center;
  color: white;
  margin-bottom: 0.2em;
  margin-top: 0.4em;
`;