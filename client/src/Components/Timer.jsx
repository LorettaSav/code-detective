import { useState } from "react"

export default function Timer() {

    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(true);
// i need hours/ minutes and seconds separately
// 1s = 1000ms
// 1m = 60000ms
// 1h = 3600000ms

/*
so maybe I need 3 separate instantiations of Timers
for each h/min/s
*/

  return (
    <div>Timer</div>
  )
}
