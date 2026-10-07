import { useState } from 'react'
import CardList from './CardList'

function Gameboard() {

    const [score, setScore] = useState(0);

    const handleClick = () => {
        setScore(prevScore=> prevScore+1);
    }

    return (

        <>
        
            <p>Score: {score}</p>
            <CardList onCardClick={handleClick} />
        </>
        
    )

};

export default Gameboard;