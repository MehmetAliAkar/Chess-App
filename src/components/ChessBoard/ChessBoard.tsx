import React, { useRef, useState } from "react";
import "./ChessBoard.css";
import Tile from "../Tile/Tile.tsx";
import { act } from "react-dom/test-utils";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
  shape: string;
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
const pieceImages = {
  bpawn: "assets/images/pawn_b.png",
  bbishop: "assets/images/bishop_b.png",
  bknight: "assets/images/knight_b.png",
  brook: "assets/images/rook_b.png",
  bqueen: "assets/images/queen_b.png",
  bking: "assets/images/king_b.png",
  wpawn: "assets/images/pawn_w.png",
  wbishop: "assets/images/bishop_w.png",
  wknight: "assets/images/knight_w.png",
  wrook: "assets/images/rook_w.png",
  wqueen: "assets/images/queen_w.png",
  wking: "assets/images/king_w.png",
};

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const teamType = p === 0 ? TeamType.BLACK : TeamType.WHITE;

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "assets/images/pawn_b.png",
      x: i,
      y: 6,
      type: PieceType.PAWN,
      team: TeamType.BLACK,
      shape: "assets/images/pawn_b.png",
    });
  }

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({
      image: "assets/images/pawn_w.png",
      x: i,
      y: 1,
      type: PieceType.PAWN,
      team: TeamType.WHITE,
      shape: "assets/images/pawn_w.png",
    });
  }

  initialBoardState.push({
    image: "assets/images/rook_b.png",
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.BLACK,
    shape: "assets/images/rook_b.png",
  });
  initialBoardState.push({
    image: "assets/images/rook_b.png",
    x: 0,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.BLACK,
    shape: "assets/images/rook_b.png",
  });
  initialBoardState.push({
    image: "assets/images/knight_b.png",
    x: 1,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
    shape: "assets/images/knight_b.png",
  });
  initialBoardState.push({
    image: "assets/images/knight_b.png",
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.BLACK,
    shape: "assets/images/knight_b.png",
  });
  initialBoardState.push({
    image: "assets/images/bishop_b.png",
    x: 2,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
    shape: "assets/images/bishop_b.png",
  });
  initialBoardState.push({
    image: "assets/images/bishop_b.png",
    x: 5,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.BLACK,
    shape: "assets/images/bishop_b.png",
  });
  initialBoardState.push({
    image: "assets/images/queen_b.png",
    x: 3,
    y: 7,
    type: PieceType.QUEEN,
    team: TeamType.BLACK,
    shape: "assets/images/queen_b.png",
  });
  initialBoardState.push({
    image: "assets/images/king_b.png",
    x: 4,
    y: 7,
    type: PieceType.KING,
    team: TeamType.BLACK,
    shape: "assets/images/king_b.png",
  });

  initialBoardState.push({
    image: "assets/images/rook_w.png",
    x: 7,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.WHITE,
    shape: "assets/images/rook_w.png",
  });
  initialBoardState.push({
    image: "assets/images/rook_w.png",
    x: 0,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.WHITE,
    shape: "assets/images/rook_w.png",
  });
  initialBoardState.push({
    image: "assets/images/knight_w.png",
    x: 1,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
    shape: "assets/images/knight_w.png",
  });
  initialBoardState.push({
    image: "assets/images/knight_w.png",
    x: 6,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.WHITE,
    shape: "assets/images/knight_w.png",
  });
  initialBoardState.push({
    image: "assets/images/bishop_w.png",
    x: 2,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
    shape: "assets/images/bishop_w.png",
  });
  initialBoardState.push({
    image: "assets/images/bishop_w.png",
    x: 5,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.WHITE,
    shape: "assets/images/bishop_w.png",
  });
  initialBoardState.push({
    image: "assets/images/queen_w.png",
    x: 3,
    y: 0,
    type: PieceType.QUEEN,
    team: TeamType.WHITE,
    shape: "assets/images/queen_w.png",
  });
  initialBoardState.push({
    image: "assets/images/king_w.png",
    x: 4,
    y: 0,
    type: PieceType.KING,
    team: TeamType.WHITE,
    shape: "assets/images/king_w.png",
  });
}

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const ChessBoardRef = useRef<HTMLDivElement>(null);
  const [moves, setMoves] = useState<string[]>([]);
  // const [initialBoardState,setInitialBoardState] = useState([]);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [pool, setPool] = useState<Piece[]>([]);

  function CapturedPiecesPool() {
    const imageStyle = {
      width: "30px",
      height: "30px",
    };

    return (
      <div className="captured-pieces-pool">
        {pool.map((piece, index) => (
          <img
            key={index}
            src={piece.image}
            alt=""
            style={imageStyle}
            onClick={() => handleCapturedPieceClick(index)}
          />
        ))}
      </div>
    );
  }

  function handleCapturedPieceClick(index: number) {
    const selectedPiece = pool[index];
    if (selectedPiece) {
      // remove the piece
      setPool((prevCapturedPieces) => [
        ...prevCapturedPieces.slice(0, index),
        ...prevCapturedPieces.slice(index + 1),
      ]);

      // add piece back to the board
      setPool((prevPieces) => [...prevPieces, selectedPiece]);
    }
  }

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = ChessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridElement = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((el) => el.getAttribute("data-x") != null);
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

  function removeProperty(piece: Piece) {
    piece.x = gridX;
    piece.y = gridY;
  }

  function dropPiece(e: React.MouseEvent) {
    const gridElement = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => el.getAttribute("data-x") != null);
    const tileX = Number(gridElement?.getAttribute("data-x"));
    const tileY = Number(gridElement?.getAttribute("data-y"));

    if (!(tileX === gridX && tileY === gridY)) {
      const pieceToDie = pieces.find((p) => p.x === tileX && p.y === tileY);
      if (pieceToDie) {
        setPool((prevCapturedPieces)=>[...prevCapturedPieces, pieceToDie]);
        pieceToDie.x = -1;
        pieceToDie.y = -1;
      }

      const movedPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      const eatenPiece = pieces.find((p) => p.x === tileX && p.y === tileY);

      if (movedPiece) {
        const pieceImage = movedPiece.image.slice(13, -4); //passed the asset/images part
        const eatenImage = eatenPiece?.image.slice(13, -4);
        let moveLog = `${pieceImage} (${gridX + 1}, ${gridY + 1}) -> (${
          tileX + 1
        }, ${tileY + 1})`;
        const isSquareOccupied = (x: number, y: number, pieces: Piece[]) =>
          pieces.some((piece) => piece.x === x && piece.y === y);
        if (isSquareOccupied(tileX, tileY, pieces)) {
          moveLog = `${pieceImage} (${gridX + 1}, ${
            gridY + 1
          }) -> ${eatenImage} (${tileX + 1}, ${tileY + 1})`;
        }

        
        setMoves((prevMoves) => [...prevMoves, moveLog]);

        setPieces((value) => {  
          const updatedPieces = value.map((p) => {
            if (p.x === gridX && p.y === gridY) {
              p.x = tileX;
              p.y = tileY;
            }
            return p;
          });

          // add the current state of the chessboard

          return updatedPieces;
        });

        setActivePiece(null);
      }
    }
  }

  let board: React.ReactNode[] = [];
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

  function getPieceType(move) {
    if (move.includes("pawn_b")) {
      return "bpawn";
    } else if (move.includes("bishop_b")) {
      return "bbishop";
    } else if (move.includes("knight_b")) {
      return "bknight";
    } else if (move.includes("rook_b")) {
      return "brook";
    } else if (move.includes("queen_b")) {
      return "bqueen";
    } else if (move.includes("king_b")) {
      return "bking";
    } else if (move.includes("pawn_w")) {
      return "wpawn";
    } else if (move.includes("bishop_w")) {
      return "wbishop";
    } else if (move.includes("knight_w")) {
      return "wknight";
    } else if (move.includes("rook_w")) {
      return "wrook";
    } else if (move.includes("queen_w")) {
      return "wqueen";
    } else if (move.includes("king_w")) {
      return "wking";
    }
    return null;
  }

  function MoveLog({
    moves,
    onMoveClick,
  }: {
    moves: string[];
    onMoveClick: (index: number) => void;
  }) {
    const imageStyle = {
      width: "20px",
      height: "20px",
    };

    return (
      <div className="log-container">
        <h3>HAMLELER</h3>
        <ul>
          {moves.map((move, index) => (
            <li key={index} onClick={() => onMoveClick(index)}>
              <span>
                {getPieceType(move) && (
                  <img
                    src={pieceImages[getPieceType(move)]}
                    alt=""
                    style={imageStyle}
                  />
                )}
              </span>
              <button>{move.slice(7)}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function handleMoveClick(index: number) {
    const updatedMoves = moves.slice(0, index + 1);
    setMoves(updatedMoves);

    const updatedPieces = initialBoardState.slice(0, index + 1);
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
      <MoveLog moves={moves} onMoveClick={handleMoveClick} />
      <CapturedPiecesPool>{CapturedPiecesPool()}</CapturedPiecesPool>
      {board}
    </div>
  );
}
