import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import Player from "./Components/Player"
import { useState } from 'react'
import { WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from "./Components/GameOver.jsx";
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
function derivedActivePlayer(gameTurns){
let currentPlayer ='X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}

function App() {
  const [players,setPlayers]=useState({
    X:'Player 1',
    O:'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  //const [winner, setWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedActivePlayer(gameTurns);
   let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
    for(const turn of gameTurns){
        const {square,player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if(firstSquare !== null && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = firstSquare;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((prevActivePlayer) => (prevActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns(prevTurns =>{
      const activePlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [{square:{row: rowIndex, col: colIndex}, player: activePlayer},...prevTurns];
      return updatedTurns;
    });
  }
 function handleRestart(){

  setGameTurns([]);
  //setWinner(null);
  //setActivePlayer('X');
 }
 function handlePlayerNameChange(symbol, newName){
  setPlayers((prevPlayers)=>{
    return {
      ...prevPlayers,
      [playerSymbol]: newName
    }
  })
 }
  return (
    <main>
    <div id='game-container'>
      <ol id="players" className='highlight-player'>
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare}  board={gameBoard} />
    </div>
    <Log turns={gameTurns}/>
    </main>
  )
}

export default App
