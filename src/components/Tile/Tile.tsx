import './Tile.css'
import React from 'react'

interface Props{
    image : string;
    number : number;
}

export default function Tile({image,number} : Props   )
{
    if(number%2===0)
    {
        return(
            <div className="black-tile">
                {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
            </div>
        );
    }  
    else
    {
        return(<div className='white-tile'>
            {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
        </div>)
    }
}