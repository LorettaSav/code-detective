export default function WinView({ playAgain }) {
    
    function handlePlayClick() {
        playAgain(true);
    }

  return (
      <div className="row">
          <h1 style={{ fontSize: "2.5rem" }}> YOU WON!!!</h1>
          <h3> We are proud to present you your <em>Coding badge</em>, Detective!</h3>
          <div className="col-5" style={{textAlign:"center"}}>  
            <img src="https://ih1.redbubble.net/image.3766496998.6834/fposter,small,wall_texture,product,750x1000.jpg" alt="nacho-average-detective-meme" style={{ marginTop: "0.5vw", width: "40%" }} />
          </div>
          
          <div className="col-3" >
              <button className="btn" onClick={handlePlayClick}> Play again </button>
          </div>

      </div>
  )
}
