export default function WinView({ playAgain }) {
    
    function handlePlayClick() {
        playAgain(true);
    }

  return (
      <div style={{ textAlign: "center" }}>
          <h1> YOU WON!!!</h1>
          <h2> We are proud to present you your <em>Coding badge</em>, Detective!</h2>
          <img src="https://ih1.redbubble.net/image.3766496998.6834/fposter,small,wall_texture,product,750x1000.jpg" alt="nacho-average-detective-meme" style={{ marginLeft: "5vw", marginTop: "2vw", width: "20%" }} />
          
          <div>
              <button className="btn" onClick={handlePlayClick}> Play again </button>
          </div>

      </div>
  )
}
