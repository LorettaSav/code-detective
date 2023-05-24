import { Link } from "react-router-dom";



export default function Card() {

    const handleClick = () => {

    }

  return (
    <div className='card' onClick={handleClick}>
        <div>
            <Link to="/game">
                Game Version
            </Link>
        </div>
        <div>
            Click to Play
        </div>
    </div>
  )
}
