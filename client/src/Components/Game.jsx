import { useEffect, useState } from "react";
import Compiler from "./Compiler";
import SuccessView from "./SuccessView";
import LossView from "./LossView";
import WinView from "./WinView";

export default function Game() {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(""); //handle errors in fetch
  const [play, setPlay] = useState(false); //to control play button and start of game
  const [level, setLevel] = useState(0); // to keep track of levels, fetch level snippets and update level on client screen
  const [levelSuccess, setLevelSuccess] = useState(false);
  const [levelLoss, setLevelLoss] = useState(false);

  
  useEffect(() => {
    getSnippets();
  }, [level]); // a dependency of getting appropriate snippets when change of level?

  //Get snippets in random order according to level.
  function getSnippets(level_id) {
    // console.log("getsnippet", level)
    sendRequest("GET", level_id);
  }

  //HANDLING COMPILER RESULT
  function handleResult(result) {
    (result === "your code passes all tests!" ? setLevelSuccess(true) : setLevelLoss(true))
  }

  //GAME PLAY

  //setting play to true or false and handle start of game
  // the level needs to be set to one.
  function handlePlay() {
    setPlay(true);
    setLevel(1);
    // console.log("handleplay",level)
  }  

  function handleNext(success,play) {
    //to check that we are not on the last level
    if (level !== 4) {
      setLevel(level + 1);
    } 
    setLevelSuccess(success); //so that editor appears again
    setPlay(play);
 }

  
  //     NEEDS CHECKING!!!!!!!!
  
  function handleTryAgain(loss,success,play,level) {
    //Resetting
    setLevelLoss(loss);
    setLevelSuccess(success);
    setPlay(play)
    setLevel(1);
  }

  function handlePlayAgain(play) {
    if (play) {
      handleTryAgain()
      setPlay(true)
      }
  }

  //CONNECTING WITH DB

  async function sendRequest(method, level_id = "", options) {
    level_id = level;
    // console.log("sendRequest",level_id)
    try {
      // update task from database
      const response = await fetch(`/api/snippets/level/${level_id}`, {
        method,
        ...options,
      });
      const data = await response.json();
      // console.log(data)
      if (!response.ok) throw new Error(data.message);
      //upon success, update tasks
      // console.log(data)
       setSnippets(data);
    } catch (err) {
      // upon failure, show error message
      setError(err.message);
    }
  }
  

  return (
    
    <div>

      {levelSuccess && level === 4 ? <WinView playAgain={ (res) => handlePlayAgain(res)} /> :   
        
        levelLoss ? <LossView tryAgain={(loss, success, play, level) => handleTryAgain(loss, success, play, level)} /> :
        
        <div className="gameBox">
          <div className="instructionBox">
            <h4> Instructions</h4>
            <p className="instructions">
              Look at the code and spot the error!
              <br />
              <br />
              There are 4 levels of difficulty,
              starting from EASY at Level 1 .
              <br />
              Can you figure them all out and earn
              your Coding badge?
            </p>
            <div>
              <button className="btn" onClick={handlePlay}
                disabled={play || levelSuccess}>
                Play
              </button>
             
              <div className="levelBox">{play ? <h5>Level {level}</h5> : null}</div>
            </div>
          </div>

          {/*HANDLING LEVEL SUCCESS */}
          <div className="successBox"> 
            {
              levelSuccess ? <SuccessView handleNext={ (success,play) => handleNext(success,play)}  level={level} /> : 
                <Compiler snippets={snippets} gamePlay={play} level={level} userResult={(res) => handleResult(res)} />
            }
          </div>
        </div>
      } 

    </div>
  );
}


