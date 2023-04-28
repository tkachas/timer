import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [time, setTime] = useState("00:00:00");
  const [timer, setTimer] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  }, []);

  const startTimer = () => {
    if (timer) return;

    const newTimer = setInterval(() => {
      setElapsedSeconds((prevElapsedSeconds) => {
        const newElapsedSeconds = prevElapsedSeconds + 1;
        setTime(formatTime(newElapsedSeconds));
        return newElapsedSeconds;
      });
    }, 1000);

    setTimer(newTimer);
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const resetTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setTime("00:00:00");
    setElapsedSeconds(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="App">
      <h1>Таймер</h1>
      <h2>{time}</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
