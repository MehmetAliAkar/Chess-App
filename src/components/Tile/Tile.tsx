import './Tile.css'
import React from 'react'

interface Props{
    image : string;
    number : number;
}

export default function Tile({image,number} : Props )
{
    let color;
    color = number % 2 === 0 ? 'black' : 'white';
    return(<div className= {`tile ${color}-tile`}>{image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}</div>);
}