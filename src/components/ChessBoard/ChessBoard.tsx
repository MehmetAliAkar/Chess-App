  import React, { useRef, useState } from "react";
  import "./ChessBoard.css";
  import Tile from "../Tile/Tile.tsx";
  import Referee from "../Referee/Referee.ts";

  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
  }

  export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING,
  }

  export enum TeamType {
    BLACK,
    WHITE,
  }

  const initalBoardState: Piece[] = [];

  for (let p = 0; p < 2; p++) {
    const teamType = p === 0 ? TeamType.BLACK : TeamType.WHITE;

    for (let i = 0; i < 8; i++) {
      initalBoardState.push({
        image: "assets/images/pawn_b.png",
        x: i,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.BLACK,
      });
    }

    for (let i = 0; i < 8; i++) {
      initalBoardState.push({
        image: "assets/images/pawn_w.png",
        x: i,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.WHITE,
      });
    }

    initalBoardState.push({
      image: "assets/images/rook_b.png",
      x: 7,
      y: 7,
      type: PieceType.ROOK,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/rook_b.png",
      x: 0,
      y: 7,
      type: PieceType.ROOK,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/knight_b.png",
      x: 1,
      y: 7,
      type: PieceType.KNIGHT,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/knight_b.png",
      x: 6,
      y: 7,
      type: PieceType.KNIGHT,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/bishop_b.png",
      x: 2,
      y: 7,
      type: PieceType.BISHOP,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/bishop_b.png",
      x: 5,
      y: 7,
      type: PieceType.BISHOP,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/queen_b.png",
      x: 3,
      y: 7,
      type: PieceType.QUEEN,
      team: TeamType.BLACK,
    });
    initalBoardState.push({
      image: "assets/images/king_b.png",
      x: 4,
      y: 7,
      type: PieceType.KING,
      team: TeamType.BLACK,
    });

    initalBoardState.push({
      image: "assets/images/rook_w.png",
      x: 7,
      y: 0,
      type: PieceType.ROOK,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/rook_w.png",
      x: 0,
      y: 0,
      type: PieceType.ROOK,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/knight_w.png",
      x: 1,
      y: 0,
      type: PieceType.KNIGHT,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/knight_w.png",
      x: 6,
      y: 0,
      type: PieceType.KNIGHT,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/bishop_w.png",
      x: 2,
      y: 0,
      type: PieceType.BISHOP,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/bishop_w.png",
      x: 5,
      y: 0,
      type: PieceType.BISHOP,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/queen_w.png",
      x: 3,
      y: 0,
      type: PieceType.QUEEN,
      team: TeamType.WHITE,
    });
    initalBoardState.push({
      image: "assets/images/king_w.png",
      x: 4,
      y: 0,
      type: PieceType.KING,
      team: TeamType.WHITE,
    });
  }

  export default function ChessBoard() {
    // const[history,setHistory]=useState([Array.(100).fill(null)]);
    // const[currentMove,setCurrentMove]=useState(0);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    let [gridX, setGridX] = useState(0);
    let [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initalBoardState);
    const ChessBoardRef = useRef<HTMLDivElement>(null);
    const [moves, setMoves] = useState([]);
    const referee = new Referee();

    // function handlePlay(nextSquares){
    //   const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    //   setHistory(nextHistory);
    //   setCurrentMove(nextHistory.length-1);
    // }

    function grabPiece(e: React.MouseEvent) {
      const element = e.target as HTMLElement;
      const chessboard = ChessBoardRef.current;
      if (element.classList.contains("chess-piece") && chessboard) {
        // Get the grid element at the current mouse position
        const gridElement = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find((el) => el.getAttribute("data-x") != null);
        // Get the grid coordinates from the grid element
        const gridX = Number(gridElement?.getAttribute("data-x"));
        const gridY = Number(gridElement?.getAttribute("data-y"));
        setGridX(gridX);
        setGridY(gridY);

        const x = e.clientX - 40;
        const y = e.clientY - 40;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        setActivePiece(element);
      }
    }

    function movePiece(e: React.MouseEvent) {
      const chessboard = ChessBoardRef.current;
      const chessClientRect = chessboard!.getBoundingClientRect();
      if (activePiece && chessboard) {
        const minX = chessClientRect.left - 20;
        const minY = chessClientRect.top - 20;
        const maxX = chessClientRect.left + chessClientRect.width - 50;
        const maxY = chessClientRect.top + chessClientRect.height - 50;
        const x = e.clientX - 40;
        const y = e.clientY - 40;
        activePiece.style.position = "absolute";

        if (x < minX) {
          activePiece.style.left = `${minX}px`;
        } else if (x > maxX) {
          activePiece.style.left = `${maxX}px`;
        } else {
          activePiece.style.left = `${x}px`;
        }

        if (y < minY) {   
          activePiece.style.top = `${minY}px`;
        } else if (y > maxY) {
          activePiece.style.top = `${maxY}px`;
        } else {
          activePiece.style.top = `${y}px`;
        }
      }
    }

    function dropPiece(e: React.MouseEvent) {
      const gridElement = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((el) => el.getAttribute("data-x") != null);
      // Get the grid coordinates from the grid element
      const tileX = Number(gridElement?.getAttribute("data-x"));
      const tileY = Number(gridElement?.getAttribute("data-y"));

      if (!(tileX === gridX && tileY === gridY)) {
        const pieceToDie = pieces.find((p) => p.x === tileX && p.y === tileY);
        if (pieceToDie) {
          pieceToDie.x = -1;
          pieceToDie.y = -1;
        }

        const moveLog = `(${gridX + 1}, ${gridY + 1}) -> (${tileX + 1}, ${tileY + 1})`;

        setMoves((prevMoves) => [...prevMoves, moveLog]);

        setPieces((value) => {
  const pieces = value.map((p) => {
    if (p.x === gridX && p.y === gridY) {
      const validMove = referee.isValidMove(
        gridX,
        gridY,
        tileX,
        tileY,
        p.type,
        p.team,
        value
      );
      if (validMove) {
        p.x = tileX;
        p.y = tileY;
      } else {
        activePiece.style.position = 'relative';
        activePiece?.style.removeProperty('top');
        activePiece?.style.removeProperty('left');
      }
    }
    return p;
  });
  return pieces;
});

setActivePiece(null);

    }
    }

    let board: React.JSX.Element[] = [];
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
        const number = j + i + 2;
        let image = undefined;

        pieces.forEach((p) => {
          if (p.x === i && p.y === j) {
            image = p.image;
          }
        });
        board.push(
          <Tile
            posx={i}
            posy={j}
            key={`${j},${i}`}
            image={image}
            number={number}
          />
        );
      }
    }

    function MoveLog({ moves, onMoveClick }) {
      return (
        <div className="log-container">
          <h3> Hamle Logları </h3>
          <ul>
            {moves.map((move, index) => (
              <li key={index} onClick={() => onMoveClick(index)}>
                <button>{move}</button>
              </li>
            ))}
          </ul>   
        </div>
      );
    }

    function handleMoveClick(index) {
      setCurrentMove(index);
      const updatedPieces = initalBoardState.slice(0, index + 1);
      setPieces(updatedPieces);
    }

    return (
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="ChessBoard"
        ref={ChessBoardRef}
      >
        <MoveLog moves={moves} onMoveClick={handleMoveClick}></MoveLog>
        {board}
      </div>
    );
  }
