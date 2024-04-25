import {useState} from 'react'

export default function Player({playerName, setPlayerName, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false)
    let editablePlayerName = <span className='player-name'>{playerName}</span>
    let buttonText = 'Edit'

    if (isEditing) {
        editablePlayerName = <input placeholder="Enter Name"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(symbol, e.target.value)}/>
        buttonText = 'Save'
    }

    function toggleHandler() {
        setIsEditing(prevState => !prevState)
    }

    return <li className={isActive ? 'active' : undefined}>
                <span className='player'>
                    {editablePlayerName}
                    <span className='player-symbol'>{symbol}</span>
                </span>
        <button onClick={toggleHandler}>{buttonText}</button>
    </li>
}