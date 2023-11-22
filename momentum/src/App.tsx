import React, {useState} from 'react';
import './App.css';
import {DateAndTime} from "./Components/DateAndTime";
import {Greeting} from "./Components/Greeting";
import {QuoteBlock} from "./Components/QuoteBlock";
type QuoteType = {
    quote: string,
    author: string
}
function App() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <DateAndTime
                date={date}
                setDate={setDate}/>
            <Greeting
                date={date}/>
            <QuoteBlock />
        </div>
    );
}

export default App;
