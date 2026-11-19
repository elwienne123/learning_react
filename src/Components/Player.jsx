import {useState} from 'react'
export default function Player({initialName,symbol, isActive,onChangeName}){
    const [playerName, setPlayerName]=useState(initialName);
    const [isEditing, setIsEditing]=useState(false);
    let editablePlayerName=<span className="player-name">{playerName}</span>;
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    function handleClick(){
        setIsEditing((editing)=>!editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    if(isEditing){
        editablePlayerName=<input type="text" value={playerName} onChange={handleChange} required></input>
    }
    return (
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}