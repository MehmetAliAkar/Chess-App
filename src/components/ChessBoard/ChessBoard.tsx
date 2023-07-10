import  {useRef, useState } from 'react';
import './ChessBoard.css';
import Tile from '../Tile/Tile.tsx';
import { PAWN } from 'chess.js';

const verticalAxis = ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ["a","b","c","d","e","f","g","h"];

interface Piece{
    image:string;
    x:number; 
    y:number;
    type : PieceType;
}

export enum TeamType{
    OPPONENT,
    OUR
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

const initalBoardState : Piece[] = [];

for(let i=0;i<8;i++){
    initalBoardState.push({image:"assets/images/pawn_b.png",x:i,y:6,type:0});
}

for(let i=0;i<8;i++){
    initalBoardState.push({image:"assets/images/pawn_w.png",x:i,y:1,type:0});
}


initalBoardState.push({image:"assets/images/rook_b.png",x:7,y:7, type:3});
initalBoardState.push({image:"assets/images/rook_b.png",x:0,y:7,type:3});
initalBoardState.push({image:"assets/images/knight_b.png",x:1,y:7,type:2});
initalBoardState.push({image:"assets/images/knight_b.png",x:6,y:7, type:2});
initalBoardState.push({image:"assets/images/bishop_b.png",x:2,y:7,type:1});
initalBoardState.push({image:"assets/images/bishop_b.png",x:5,y:7,type:1});
initalBoardState.push({image:"assets/images/queen_b.png",x:3,y:7,type:4});
initalBoardState.push({image:"assets/images/king_b.png",x:4,y:7,type:5});

initalBoardState.push({image:"assets/images/rook_w.png",x:7,y:0,type:3});
initalBoardState.push({image:"assets/images/rook_w.png",x:0,y:0,type:3});
initalBoardState.push({image:"assets/images/knight_w.png",x:1,y:0,type:2});
initalBoardState.push({image:"assets/images/knight_w.png",x:6,y:0,type:2});
initalBoardState.push({image:"assets/images/bishop_w.png",x:2,y:0,type:1});
initalBoardState.push({image:"assets/images/bishop_w.png",x:5,y:0,type:1});
initalBoardState.push({image:"assets/images/queen_w.png",x:3,y:0,type:4});
initalBoardState.push({image:"assets/images/king_w.png",x:4,y:0,type:5});

export default function ChessBoard(){
const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
const [gridX, setGridX] = useState(0);
const [gridY, setGridY] = useState(0);
const [pieces, setPieces] = useState<Piece[]>(initalBoardState);
const ChessBoardRef = useRef<HTMLDivElement>(null);


function grabPiece(e:React.MouseEvent){
    const element = e.target as HTMLElement;
    const chessboard = ChessBoardRef.current;
    if(element.classList.contains("chess-piece") && chessboard){
        setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
        setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 560) / 100)));
        const x = e.clientX - 35;
        const y = e.clientY - 35;
        element.style.position="absolute";
        element.style.left=`${x}px`;
        element.style.top=`${y}px`;

        setActivePiece(element);
    }
}

function movePiece(e:React.MouseEvent)
{
    const chessboard = ChessBoardRef.current;
    const chessClientRect = chessboard!.getBoundingClientRect();
    if(activePiece && chessboard)
    {
        const minX = chessboard.offsetLeft - 19;
        const minY = chessClientRect.top - 19;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth;
        const maxY = chessClientRect.top + chessClientRect.height ;
        const x= e.clientX - 35;
        const y= e.clientY - 35;
        activePiece.style.position="absolute";

        if(x < minX){
            activePiece.style.left = `${minX}px`;
        }
        else if(x > maxX){
            activePiece.style.left = `${maxX}px`;
        }
        else{
            activePiece.style.left = `${x}px`;
        }

        if(y < minY){
            activePiece.style.top = `${minY}px`;
        }
        else if(y > maxY) {
            activePiece.style.top = `${maxY}px`
        }
        else{
            activePiece.style.top = `${y}px`;
        }

    }   

}

function dropPiece(e:React.MouseEvent){
    const chessboard = ChessBoardRef.current;   
    if(activePiece && chessboard)
    {
        const x = (Math.floor((e.clientX - chessboard.offsetLeft )/100));
        const y = (Math.abs(Math.floor((e.clientY - chessboard.offsetTop - 560)/100)));
        setPieces(value => {
            const pieces = value.map(p => {
                if (p.x === gridX && p.y === gridY){ 
                    
                    p.x = x;
                    p.y = y;
                }
                return p;
            });
            return pieces;
        })
        setActivePiece(null)}; 
}
    let board = [];
    
    for(let j = verticalAxis.length - 1; j>=0 ; j--)
    {
        for(let i=0;i<horizontalAxis.length;i++)
        {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if(p.x===i && p.y===j)
                {
                    image=p.image;  
                }
            })
            board.push(<Tile key = {`${j},${i}`} image={image} number={number}/>);
        }
    }

    return (
        <div
        onMouseMove={(e)=>movePiece(e)}  
        onMouseDown={(e)=>grabPiece(e)} 
        onMouseUp={(e)=>dropPiece(e)}
        id = "ChessBoard"
        ref={ChessBoardRef}
        >{board}
        
        </div>
    );
}