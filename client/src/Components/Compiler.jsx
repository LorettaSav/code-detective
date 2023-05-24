import { useState } from 'react';
import Editor from "@monaco-editor/react";
import  { useRef } from 'react';

export default function Compiler({snippets, gamePlay}) {
  //values to be received by game snippets to be shown on Editor 
  const editorRef = useRef(null);
  const [toggleTheme, setToggleTheme] = useState(false) //light theme default
  const [ inputValue, setInputValue] = useState("")

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }
  
  //so basically this can be my import from DB to show challenges!
  const randIndex = Math.floor(Math.random()*snippets.length)
  const value = `${snippets.map((e) => e.code)[randIndex]}`

  function handleToggleTheme () {
    setToggleTheme(!toggleTheme)
  }

  function getInputValue (e) {
    e.preventDefault();
    const input = editorRef.current.getValue();
    setInputValue(input);
  }

  return (
    <div>
      <button className='btn' 
            onClick={handleToggleTheme}>
              { toggleTheme ? "Light theme" : "Dark theme"} </button>
      {/* Could maybe add an option for player to choose "light" or "vs-dark" and change page css accordingly?*/}
      <Editor height="20vw" 
      theme={toggleTheme ? "vs-dark" : "light"} 
      width="50vw"
      defaultLanguage="javascript" 
      value= { gamePlay ? value : "//Welcome, Detective!"}
      onMount={handleEditorDidMount}
      options={{suggest :{preview:true}}}
      />
      
      <button className="btn" onClick={getInputValue}>Submit Answer</button>

      <div>
  
      </div>

    </div>
  )
}
