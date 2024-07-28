// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setelapsedTime] = useState(0);
  const IntervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

    if(isRunning){
        IntervalIdRef.current = setInterval(() => {
            setelapsedTime(Date.now() - startTimeRef.current)
        }, 10);
    }
    return () => {
        clearInterval(IntervalIdRef.current)
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
      setelapsedTime(0)
      setIsRunning(false);
  };

  const formatTime = () => {

    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    let min = Math.floor(elapsedTime / (1000 * 60 ) % 60)
    let sec = Math.floor(elapsedTime / (1000) % 60)
    let milisec = Math.floor(elapsedTime % 1000 / 10)

    // hours = String(hours).padStart(2, "0")
    min = String(min).padStart(2, "0")
    sec = String(sec).padStart(2, "0")
    milisec = String(milisec).padStart(2, "0")

    return `${min}:${sec}:${milisec}`;
  };

  return (
    <>
      <div className="box flex flex-col items-center border-black border-8 p-20 rounded-[80px] bg-white">
        <div className="text-[5rem] font-mono font-bold text-[hsl(0,0%,30%)] shadow-[2px 2px 2px hsla(0,0%,0%,0.75)] mb-5">{formatTime()}</div>
        <div>
          <button className="btn-1 bg-[hsl(115,100%,40%)]" onClick={start}>Start</button>
          <button className="btn-2 bg-[hsl(10,90%,50%)]" onClick={stop}>Stop</button>
          <button className="btn-3 bg-[hsl(205,90%,60%)]" onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default Stopwatch;
