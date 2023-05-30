import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function Compiler({ snippets, gamePlay, level, userResult}) {
  //values to be received by game snippets to be shown on Editor
  const editorRef = useRef(null);
  const [toggleTheme, setToggleTheme] = useState(false); //light theme default
  const [error, setError] = useState('');

 

  function handleEditorDidMount(editor) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }
  
  //getting the snippet that will be shown in editor
  let value;
  //getting the snipped ID shown in editor
  let question_id;
  //so basically this can be my import from DB to show challenges
    
    if (level > 0) {
    const randIndex = Math.floor(Math.random() * snippets.length);
    value = `${snippets.map((e) => e.code)[randIndex]}`;
    question_id = snippets.map((e) => e.id)[randIndex]; 
  }

  //Simple functionality of changing editor theme from light to dark. and vice versa.
  function handleToggleTheme() {
    setToggleTheme(!toggleTheme);
  }
  //to handle what the player has submitted, get value from editor.
  function handleInputValue(e) {
    e.preventDefault();
    const input = editorRef.current.getValue();
    // console.log("handleInputValue",input)
    sendAttempt(input)
  }

  //To Test if player's attempt is correct using VM.
  //We need to test that we check the tests which have the same id as the
  // snippet.

  async function sendAttempt(input) { 
    //console.log(question_id)
    try {
      const response = await fetch(`/api/snippets/attempt/${question_id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input})
      });
      
      const data = await response.json();
      //console.log( "sendAttempt", response)
      if(!response.ok) throw new Error(data.error)
      console.log(data) 
      //why is there an error and why am i not catching it?
      userResult(data.message);

    } catch(err){
      setError(err);
      
    }
  }


  return (
    <div>
      <button className="btn" onClick={handleToggleTheme}>
        {toggleTheme  ? "Light theme" : "Dark theme"}
      </button>
      {/* Could maybe add an option for player to choose "light" or "vs-dark" and change page css accordingly?*/}
      <Editor
        height="20vw"
        theme={toggleTheme ? "vs-dark" : "light"}
        width="50vw"
        defaultLanguage="javascript"
        value = {gamePlay? value : "//Welcome, Detective!!"}
        onMount={handleEditorDidMount}
        options={{ suggest: { preview: true } }}
        />
      
      <button className="btn" onClick={handleInputValue} disabled={!gamePlay}>
        Submit Answer
      </button>
      

         
    </div>
  );
}
