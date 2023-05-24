import { useState } from 'react';
import './App.css'
import { Link } from "react-router-dom";
//import Home from './Components/Home';
import Game from './Components/Game';


function App() {
  // const [count, setCount] = useState(0);
//  const [isUser, setIsUser] = useState(true); // for showing login options if not user.
  const [isPlay, setIsPlay] = useState(false)




  return (
    <>
       <div>
         <nav className="navbar navbar-expand-lg">
          <div className='container-fluid'>
            <a className="navbar-brand">
              <img src="./logo1.jpg" alt="" width="40" height="37"/>
            </a>
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" >
                    Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                    About this project
                </Link>
              </li>
              {/* This will be shown only if player is not  a user.For the FUTURE.
              At initial stages of project, there are no users. */}
              {/* { !isUser ? 
                <div>
                  <li className="nav-item">
                    <input type="text" placeholder='username' />
                    <input type="text" placeholder="password" />
                  </li>
                  <li className="nav-item">
                    <button>Login</button>
                  </li>
                </div>
                  : null}  */}
            </ul>   
          </div>
        </nav> 
       
      </div> 
      <div>

      <h1>  Code Detective </h1>
      </div>
      <div>
        <Game play={isPlay}/>
      </div>

      {/* My Routing*/}
     
    </>
  )
}

export default App