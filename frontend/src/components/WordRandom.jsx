import React, { useState, useEffect } from "react";

const fetchRandomWords = async (count = 3) => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${count}`
    );
    const words = await response.json();
    return words;
  } catch (error) {
    console.error("Error fetching words:", error);
    return ["error", "fetching", "words"]; // Fallback words
  }
};

const WordRandom = ({ setSelectedWord }) => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWordState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWords = async () => {
      const randomWords = await fetchRandomWords();
      setWords(randomWords);
      setLoading(false);
    };
    getWords();
  }, []);

  const handleWordSelection = (word) => {
    setSelectedWord(word);
    setSelectedWordState(word); // Update local state if you want to show confirmation
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 p-6 bg-black text-white">
      <h2 className="text-2xl font-bold text-amber-200">Pick a word to draw:</h2>
      {loading ? (
        <p className="text-xl">Loading words...</p>
      ) : (
        <div className="flex gap-6">
          {words.map((word) => (
            <div
              key={word}
              className={`text-white text-2xl font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 focus:ring-gray-300 
                ${selectedWord === word ? "bg-blue-500 text-white" : "bg-gray-800 hover:bg-gray-900"}`}
            >
              <button onClick={() => handleWordSelection(word)}>
                {word}
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedWord && (
        <p className="text-xl mt-6">You selected: <strong>{selectedWord}</strong></p>
      )}
    </div>
  );
};

export default WordRandom;
