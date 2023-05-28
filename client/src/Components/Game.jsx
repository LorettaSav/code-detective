import { useEffect, useState } from "react";
import Compiler from "./Compiler";

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

  //setting play to true or false and handle start of game
  // the level needs to be set to one.
  function handlePlay() {
    setPlay(true);
    setLevel(1);
    // console.log("handleplay",level)
  }

  //restart is available only after Play has been clicked on
  //need to return the snippet as it was initially: refresh page.
  function handleRestart() {
    setPlay(true);
    setLevel(level);
  }

  //Get snippets in random order according to level.
  function getSnippets(level_id) {
    // console.log("getsnippet", level)
    sendRequest("GET", level_id);
  }

  //a callback function for level changing that needs to be
  // sent to compiler (child)?
  function settingLevel() {
    setLevel(level+1)
  }

  function handleSuccess() {
    //if level successfull
    setLevelSuccess(true);
    setPlay(false);
   
    //if last level was passed
    // call handleWin();
  } 


  function handleLoss() {
    //if level has not been successfull
    // A new page/screen to start over?
    setLevelLoss(true);

  }
  
  function handleTryAgain() {
    //Resetting
    setLevelLoss(false);
    setLevelSuccess(false);
    setPlay(false)
    setLevel(0);
  }

  function handleNextLevel() {
     //to check that we are not on the last level
     if(level!==4) {
      setLevel(level+1);
    } 
    setLevelSuccess(false); //so that editor appears again
    setPlay(true);
  }

  //GOING IN BLIND FOR SUCCESS/LOSS
  function handleResponse(res) {
    console.log(res)
    if (res) {
      //setLevelSuccess(true) ==> new div "you got it"/no editor
      // set level to +1.
      handleSuccess();
    } else {
      //setHandleLoss(true) ==> new div + try again Button
      handleLoss();
      }

  }

  async function sendRequest(method, level_id = "", options) {
    level_id = level;
    // console.log("sendrequest",level_id)
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
      {/*HANDLING LOSS */}
      {levelLoss ?
        <div className="gameLoss"> 
          <h3 style={{marginBottom: "1.5vw"}}> Oops, Try again! </h3>
          <img src="https://i.imgflip.com/4r6apj.jpg" alt="programming bug meme" style={{width:"50%", marginRight: "3vw"}} />
          <button className="btn" onClick={handleTryAgain}> Try Again! </button>
        </div> :
        
        <div className="gameBox">
          <div className="instructionBox">
            <h4> Instructions</h4>
            <p className="instructions">
              Look at the code and spot the error! There are 4 levels of difficulty,
              starting from EASY at Level 1 . Can you figure them all out and earn
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
            levelSuccess ? <div style={{width: "80%", marginLeft: "17%"}}> 
              <div>
                YOU GOT IT!      
              </div>
              <div>
                <img src="data:image/jpeg;base64,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" alt="level-success-cheers-photo" style={{ width:"80%", margin:"1vw 0"}}/>
              </div>
              <div>
                <button className="btn" onClick={handleNextLevel} disabled={level===5}> Next </button>
              </div>
            </div> : 
              <Compiler snippets={snippets} gamePlay={play} level={level} userResponse = {(res) => handleResponse(res)}/>
            }
          </div>
        </div>
      }
    </div>
  );
}


//userResponse = {(res) => handleResponse(res)}