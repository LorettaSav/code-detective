export default function LossView({ tryAgain }) {
  function handleTryAgainClick(loss,success,play,level) {
    tryAgain(false, false, false, 0)
  }
  return (
    <div>
        <div className="gameLoss"> 
          <h3 style={{marginBottom: "1.5vw"}}> Oops, Try again! </h3>
          <img src="https://i.imgflip.com/4r6apj.jpg" alt="programming bug meme" style={{width:"40%", marginRight: "3vw"}} />
          <button className="btn" onClick={handleTryAgainClick}> Try Again! </button>
        </div>
    </div>
  )
}
