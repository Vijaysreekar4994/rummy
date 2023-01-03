import React, { useState } from "react";
import { Cards } from '../cards/Cards';
import './board.css'

export const Board = () => {
    const spade = '\u2664 ';
    const [ar, setAr] = useState(['6♣', '12♠', '8♦', '10♣', '1♣', '3♥', '6♦', '9♣', '9♠', '13♠', '4♥', '12♥', '6♥']);
    const [ar1, setAr1] = useState(['6♦', '7♦', '8♦']);

    function sortArray() {
        let filterByClub = ar1.filter(el => el.includes('♦'))
        let fil = filterByClub.filter
        // let numbers = filterByClub.indexOf('♣', 1)
        // let sortClubs = numbers.sort((a, b) => {
        //     if (a < b) {
        //         return 1;
        //     };
        //     if (a > b) {
        //         return -1;
        //     };
        // });
        console.log(filterByClub);
    }

    return (
        // <div className='board'>
        <div className='test' style={{ display: 'flex' }}>
            {ar.map((card, id) => {
                return <div className='card' key={id}>
                    <h2>{card}</h2>
                </div>
            })}
            <button onClick={() => sortArray()}>sort</button>
            {/* <div>
                <Cards />
            </div>
            <div className="jockerAndAllCardsView">
                <div className="jockerView">
                    A{spade}
                </div>
                <div className="allCardsView">
                    <div className="cardDesign">{`${spade.repeat(200)}`}</div>
                </div>
            </div> */}

        </div>
    )
};