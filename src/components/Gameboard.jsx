import { useState } from 'react'
import CardList from './CardList'

function Gameboard() {
    const [score, setScore] = useState(0);
    const [clickedList, setClickedList] = useState([]);
    const [maxScore, setMaxScore] = useState(0);
    const [cards, setCards] = useState([]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    
    const handleClick = (pokemonId) => {
        setScore(prevScore => prevScore + 1);
        setClickedList(prevClickedList => [...prevClickedList, pokemonId]);
        // console.log(score, clickedList, maxScore)

        if (clickedList.includes(pokemonId)) {
            if (score > maxScore) {
                setMaxScore(score);
            } 
            setClickedList([]);
            setScore(0);
        }
        setCards(prevList => shuffleArray(prevList));
    }

    return (
        <>
            <p>Score: {score}</p>
            <p>Max. Score: {maxScore}</p>
            <CardList cards={cards} setCards={setCards} onCardClick={handleClick} />
        </>
    )
};

export default Gameboard;