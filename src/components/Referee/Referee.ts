import { Piece, PieceType, TeamType } from "../ChessBoard/ChessBoard.tsx";

class Referee {

  isTileFull(x : number, y : number, boardState:Piece[]): boolean{
    console.log("Checking is tile full...");

    const piece = boardState.find((p)=> p.x === x && p.y === y);
    if (piece)
      return (true);
    else  
      return (false);
  }


  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log("Referee is checking the move...");
    console.log(`Previous location : (${px}, ${py})`);
    console.log(`Current location : (${x}, ${y})`);

    if (type === PieceType.PAWN)
    {
      if (team === TeamType.WHITE)
      {
        if (py === 1)
        {
          if (px === x && (y - py === 2 || y - py === 1))
          {
            if (!this.isTileFull(x,y,boardState))
              return (true);
          }
        }
        else if(px === x)
        {
          if (y - py === 1)
          {
            if (!this.isTileFull(x,y,boardState))
              return (true);
          }
        }
      }
      else if (team === TeamType.BLACK)
      {
        if (py === 6)
        {
          if (px === x && (py - y === 2 || py - y === 1))
          {
            if (!this.isTileFull(x,y,boardState))
              return (true);
          }
        }
        else if (px === x)
        {
          if (py - y === 1) 
          {
            if (!this.isTileFull(x,y,boardState))
              return (true);
          }
        }
      }
    }

    return false;
  }
}


export default Referee;
