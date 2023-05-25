import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function Compiler({ snippets, gamePlay, level, settingLevel}) {
  //values to be received by game snippets to be shown on Editor
  const editorRef = useRef(null);
  const [toggleTheme, setToggleTheme] = useState(false); //light theme default
  const [inputValue, setInputValue] = useState("");

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  const value = [];
  //so basically this can be my import from DB to show challenges!
  //WHY INFINITE LOOP??????????? maybe this should be in Game instead?
  if( level > 0) {
    const randIndex = Math.floor(Math.random() * snippets.length);
    value = `${snippets.map((e) => e.code)[randIndex]}`;
  }

  //Simple functionality of changing editor theme from light to dark. and vice versa.
  function handleToggleTheme() {
    setToggleTheme(!toggleTheme);
  }
  //to handle what the player has submitted, get value from editor.
  function handleInputValue(e) {
    e.preventDefault();
    const input = editorRef.current.getValue();
    setInputValue(input);
    //sendAttempt(input)
  }

  //To Test if player's attempt is correct using VM.
  //We need to test that we check the tests which have the same id as the
  // snippet.

  // async function sendAttempt(input) {
  //   const question_id = level; 
  //   try {
  //     const response = await fetch(` api/snippets/attempt/:${question_id}`, {
  //       method: "POST",
  //       body: JSON.stringify(input)
  //     });
  //     const data = await response.json();
  //     if(!response.ok) throw new Error(data.message)
  //     setCompilerValue(data);

  //   } catch(err){
  //     console.log(err)
  //   }
  // }

  //to handle level change => communicating to GAME and fetching
  // appropriate data after successful attempt.
  function handleNextLevel() {
    settingLevel()
  }

  return (
    <div>
      <button className="btn" onClick={handleToggleTheme}>
        {toggleTheme ? "Light theme" : "Dark theme"}{" "}
      </button>
      {/* Could maybe add an option for player to choose "light" or "vs-dark" and change page css accordingly?*/}
      <Editor
        height="20vw"
        theme={toggleTheme ? "vs-dark" : "light"}
        width="47.5vw"
        defaultLanguage="javascript"
        value={gamePlay ? compilerValue : "//Welcome, Detective!"}
        onMount={handleEditorDidMount}
        options={{ suggest: { preview: true } }}
      />

      <button className="btn" onClick={handleInputValue}>
        Submit Answer
      </button>
     {/* This button should only appear if user got question right */}
      <button className="btn" onClick={handleNextLevel}> Next </button>

    </div>
  );
}
