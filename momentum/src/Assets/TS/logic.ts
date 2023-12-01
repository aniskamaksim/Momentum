const currDate = new Date();
export function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
export const getTimeOfTheDay = (date: Date) => {
    const hours = date.getHours();
    return hours >= 0 && hours < 6 ? 'night' :
        hours >= 6 && hours < 12 ? 'morning' :
            hours >= 12 && hours < 18 ? 'afternoon' : 'evening';
}
let randomNum = getRandom(1, 20);
const currTimeOfTheDay = getTimeOfTheDay(currDate);
export const setBg = () => {
    const timeOfDay = currTimeOfTheDay;
    const bgNum = randomNum.toString().padStart(2, "0");
    const image = new Image();
    const url = `https://raw.githubusercontent.com/aniskamaksim/momentum-files/assets/images/${timeOfDay}/${bgNum}.jpg`;
    image.onload = () => {
        document.body.style.backgroundImage = `url(${url})`;
    };
    image.src = url;
}
export const changeBgToNext = ()=>{
    if(randomNum >= 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    setBg();
}
export const changeBgToPrev = ()=>{
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    setBg();
}