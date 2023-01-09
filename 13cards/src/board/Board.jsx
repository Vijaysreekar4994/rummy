import React, { useState } from "react";
import { Cards } from '../cards/Cards';
import './board.css'

export const Board = () => {
    // const [cart, setAr] = useState([
    //     ['6♣', '12♠', '8♦', '10♣'],
    //     ['9♣', '9♠', '13♠'],
    //     ['1♣', '3♥', '6♦'],
    //     ['2♣', '9♥', '7♦'],
    // ]);
    // const [cart, setAr1] = useState(['6♣', '12♠', '8♦', '10♣', '1♣', '3♥', '6♦', '9♣', '9♠', '13♠', '4♥', '12♥', '6♥']);
    return (
        // <div className='test' style={{ display: 'flex' }} key={'fgb'}>
        //     {cart.map((cards, index) => {
        //         console.log(cart.length);
        //         return (
        //             <div key={index} style={{ display: 'flex' }}>
        //                 {cart.length !== 13 ?
        //                     <>
        //                         {cards.map((subItems, sIndex) => {
        //                             return (
        //                                 <div className='card' key={sIndex}>
        //                                     <h2>{subItems}</h2>
        //                                 </div>)
        //                         })}
        //                         <div className="middleSpace"></div>
        //                     </> :
        //                     <div className='card' key={index}>
        //                         <h2>{cards}</h2>
        //                     </div>
        //                 }
        //             </div>
        //         );
        //     })}
        // </div>

        <div className='board'>
            <div>
                <Cards />
            </div>
        </div>
    )
};