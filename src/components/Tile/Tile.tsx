import './Tile.css'
import React from 'react'

interface Props{
    image : string;
    number : number;
    posx: number;
    posy: number;
}

export default function Tile({posx, posy, image,number} : Props )
{
    let color;
    color = number % 2 === 0 ? 'black' : 'white';
    return(<div data-x={posx} data-y={posy} className= {`tile ${color}-tile`}>{image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}</div>);
}