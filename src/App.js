import ChessBoard from "./components/ChessBoard/ChessBoard.tsx";
import './App.css'
import Timer from './components/Timer/Timer.tsx';


export default function App(){
    return(
        <div id = "app">
            <ChessBoard></ChessBoard>
            <Timer />
        </div>
    );
}