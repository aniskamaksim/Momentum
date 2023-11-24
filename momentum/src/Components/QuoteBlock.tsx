import React, {memo, useEffect, useState} from 'react';
import {getRandom} from "../Assets/TS/logic";
import styled from "styled-components";
import reload from "../Assets/Img/reload.svg";
import axios from "axios";

export type QuoteBlockType = {}
export const QuoteBlock: React.FC<QuoteBlockType> = memo((
    {}
) => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
        let randomNum = getRandom(1, 102);
        const result = await axios(
            'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        );
        const currQuote = result.data.quotes[randomNum].quote;
        const currAuthor = result.data.quotes[randomNum].author;
        setQuote(currQuote);
        setAuthor(currAuthor);
    };

    const changeResult = () => {
        return fetchQuote();
    }
    useEffect(() => {
        changeResult();
    }, [])
    return (
        <>
            <ImgDiv><img className={"svg_div"} src={reload} alt="Your SVG here" onClick={() => changeResult()}/></ImgDiv>
            <QuoteDiv>{quote}</QuoteDiv>
            <AuthorDiv>{author}</AuthorDiv>
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