import React from 'react'
import Whiteboard from './Whiteboard'
import GameNav from '../components/GameNav'
import GameSetting from '../components/GameSetting'
import { useState } from 'react'
import WordRandom from '../components/WordRandom'

export default function Room() {
     const [Timer, setTimer] = useState(80);
     const [Roundy, setRound] = useState(3);
     const [noword, setnoword] = useState(3);
     const [hint, sethint] = useState(2);
     const [noplayer, setnoplayer] = useState(2);
     const [selectedWord, setSelectedWord] = useState(null);
  return (
    <div>
      <GameNav Timer={Timer} setTimer={setTimer} selectedWord={selectedWord} />
      <Whiteboard/>
      <WordRandom setSelectedWord={setSelectedWord} />
      <GameSetting setTimer={setTimer} setRound={setRound} setnoword={setnoword} sethint={sethint} setnoplayer={setnoplayer}/>
    </div>
  )
}
