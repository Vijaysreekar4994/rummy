import React from "react";
import { Cards } from '../cards/Cards';
import './board.css'

export const Board = (props) => {
    return (
        <div className='board'>
            {/* <div style={{display:'flex', flexDirection:'row', backgroundColor:'red'}}> */}
            <div>
                <Cards />
            </div>
        </div>
    )
};