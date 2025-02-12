import { useState } from "react";

export default function GameSetting({ setTimer, setRound, setnoword, sethint, setnoplayer }) {
  const [players, setPlayers] = useState(8);
  const [drawTime, setDrawTime] = useState(80);
  const [rounds, setRounds] = useState(3);
  const [wordCount, setWordCount] = useState(3);
  const [hints, setHints] = useState(2);
  const [customWords, setCustomWords] = useState("");
  const [useCustomWordsOnly, setUseCustomWordsOnly] = useState(false);

  const handleDrawTimeChange = (val) => {
    const newDrawTime = Math.max(10, val);
    setDrawTime(newDrawTime);
  };

  const handleDATAChange = () => {
    setTimer(drawTime);
    setRound(rounds);
    setnoword(wordCount);
    sethint(hints); // Fixed incorrect sethint call
    setnoplayer(players);
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-35 bg-gray-900 text-white rounded-xl shadow-lg">
      <div className="space-y-4">
        <Setting label="Players" value={players} setValue={(val) => setPlayers(Math.max(2, val))} type="number" />

        <Setting label="Drawtime" value={drawTime} setValue={handleDrawTimeChange} type="number" min="10" />

        <Setting label="Rounds" value={rounds} setValue={(val) => setRounds(Math.max(1, val))} type="number" />

        <Setting label="Word Count" value={wordCount} setValue={(val) => setWordCount(Math.max(2, val))} type="number" />

        <Setting label="Hints" value={hints} setValue={(val) => setHints(Math.min(3, Math.max(0, val)))} type="number" min="0" max="3" />

        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={useCustomWordsOnly} onChange={() => setUseCustomWordsOnly(!useCustomWordsOnly)} className="w-4 h-4" />
            <span>Use custom words only</span>
          </label>
          <textarea 
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded border border-gray-700"
            placeholder="Minimum of 10 words. Separated by a comma."
            value={customWords}
            onChange={(e) => setCustomWords(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-4">
          <div className="bg-green-500 text-white px-6 py-2 rounded-lg shadow">
          <button onClick={handleDATAChange} >
            Start!
          </button>
          </div>
          <div className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow">
          <button >
            Invite
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Setting({ label, value, setValue, type = "text", options = [] }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      {options.length > 0 ? (
        <select className="bg-gray-800 text-white p-2 rounded" value={value} onChange={(e) => setValue(e.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input 
          type={type} 
          className="w-20 bg-gray-800 text-white p-2 rounded text-center" 
          value={value} 
          onChange={(e) => setValue(type === "number" ? Number(e.target.value) : e.target.value)} 
        />
      )}
    </div>
  );
}
