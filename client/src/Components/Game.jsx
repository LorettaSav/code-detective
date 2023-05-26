import { useEffect, useState } from "react";
import Compiler from "./Compiler";

export default function Game() {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(""); //handle errors in fetch
  const [play, setPlay] = useState(false); //to control play button and start of game
  const [level, setLevel] = useState(0); // to keep track of levels, fetch level snippets and update level on client screen

  useEffect(() => {
    getSnippets();
  }, [level]); // a dependency of getting appropriate snippets when change of level?

  //setting play to true or false and handle start of game
  // the level needs to be set to one.
  function handlePlay() {
    setPlay(!play);
    setLevel(1); //not working why???
    console.log(level)
  }

  function handleRestart() {
    setPlay(true);
    setLevel(level);
  }

  //Get snippets in random order according to level.
  function getSnippets(level_id) {
    sendRequest("GET", level_id);
  }

  async function sendRequest(method, level_id = "", options) {
    level_id = level;
    console.log(level_id)
    try {
      // update task from database
      const response = await fetch(`/api/snippets/level/${level_id}`, {
        method,
        ...options,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      // upon success, update tasks
      console.log(data)
      setSnippets(data);
    } catch (err) {
      // upon failure, show error message
      setError(err.message);
    }
  }
  
  //a callback function for level changing that needs to be
  // sent to compiler (child)?
  function settingLevel() {
    setLevel(level+1)
  }
  
  return (
    <div className="gameBox">
      <div className="instructionBox">
        <h4> Instructions</h4>
        <p className="instructions">
          Look at the code and spot the error! There are 5 levels of difficulty,
          starting from EASY at Level 1. Can you figure them all out and earn
          your Coding badge?
        </p>

        <button className="btn" onClick={handlePlay}>
          Play
        </button>
        <button className="btn" onClick={handleRestart} disabled={!play}>
          Restart Game
        </button>
        <div className="levelBox">{play ? <h5>Level {level}</h5> : null}</div>
      </div>
      <Compiler snippets={snippets} gamePlay={play} level={level} setLevel={settingLevel}/>
    </div>
  );
}


