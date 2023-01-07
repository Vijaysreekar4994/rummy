import React, { useState } from "react";
import { Cards } from '../cards/Cards';
import './board.css'

export const Board = () => {
    // const [ar, setAr] = useState(['6♣', '12♠', '8♦', '10♣', '1♣', '3♥', '6♦', '9♣', '9♠', '13♠', '4♥', '12♥', '6♥']);
    // const [ar1, setAr1] = useState(['6♦', '7♦', '8♦']);



    return (
        <div className='board'>
            {/* <div className='test' style={{ display: 'flex' }}> 
             {ar.map((card, id) => {
                return <div className='card' key={id}>
                    <h2>{card}</h2>
                </div>
            })} */}
            <div>
                <Cards />
            </div>
        </div>
    )
};