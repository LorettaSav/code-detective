import { useEffect, useState } from "react"
import Compiler from "./Compiler"


export default function Game() {
    const [snippets, setSnippets] = useState([]);
    const [error, setError] = useState("");
    const [play, setPlay] = useState(false)
    //const [level, setLevel] = useState(0);

    
    useEffect( () => {
     getSnippets()
    },[])

    function handlePlay() {
        setPlay(!play);
    }

    function getSnippets(level_id) {
        sendRequest("GET",level_id)
    } 
    async function sendRequest(method, level_id = "", options) {
        try {
          // update task from database
          const response = await fetch(`/api/snippets/${level_id}`, { method, ...options });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message);
          // upon success, update tasks
          setSnippets(data);
        } catch (err) {
          // upon failure, show error message
          setError(err.message);
        }
      }


  return (
    <div className="gameBox">
        <div className="instructionBox">
            <h4> Instructions</h4>
            <p className="instructions"> Look at the code and spot the error!
            There are 5 levels of difficulty, starting from EASY at Level 1.
            Can you figure them all out and earn your badge?</p>

            <button className="btn" onClick={handlePlay}> Play </button>
            <button className="btn" onClick={handlePlay}> Restart Game</button>
            <div className="levelBox">
                {
                    play ? <h5>Level</h5> : null
                }
            </div>
        
        </div>
        <Compiler snippets={snippets} gamePlay ={play}/>
    </div>
  )
}

// {
//     snippets.map( (e) => (
//     <div key={e.id}> 
//         <li>{e.code}</li> 
//     </div>) )
// }