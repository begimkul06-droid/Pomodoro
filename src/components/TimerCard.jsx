import { useEffect, useRef, useState } from "react";

const formatTime = (commonSeconds) => {
  const minutes = Math.floor(commonSeconds / 60);
  const seconds = commonSeconds % 60;
  const newMinutes = minutes < 10 ? "0" + minutes : minutes;
  const newSeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${newMinutes}:${newSeconds}`;
};

function TimerCard({
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  onProgress,
  mode,
  setMode,
}) {
  const [timer, setTimer] = useState(pomodoroTime);
  const [statusBtn, setStatusBtn] = useState(false);
  const intervalRef = useRef(null);

  const pomodoroRef = useRef(null);
  const shortBreakRef = useRef(null);
  const longBreakRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setStatusBtn(false);

    if (mode === "pomodoro") {
      setTimer(pomodoroTime);
    } else if (mode === "shortBreak") {
      setTimer(shortBreakTime);
    } else if (mode === "longBreak") {
      setTimer(longBreakTime);
    }
  }, [mode, pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    if (!statusBtn) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev > 0 ? prev - 1 : 0;

        const currentTime =
          mode === "pomodoro"
            ? pomodoroTime
            : mode === "shortBreak"
            ? shortBreakTime
            : longBreakTime;

        onProgress(((currentTime - newTime) / currentTime) * 100);

        if (newTime === 0) clearInterval(intervalRef.current);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [
    statusBtn,
    mode,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    onProgress,
  ]);

  const handleStatusBtn = () => {
    if (!statusBtn && timer === 0) {
      if (mode === "pomodoro") setTimer(pomodoroTime);
      else if (mode === "shortBreak") setTimer(shortBreakTime);
      else setTimer(longBreakTime);
    }
    setStatusBtn((prev) => !prev);
  };

  const handleSkip = () => {
    clearInterval(intervalRef.current);
    setStatusBtn(false);

    if (mode === "pomodoro") {
      setMode("shortBreak");
      setTimeout(() => shortBreakRef.current?.focus(), 0);
    } else if (mode === "shortBreak") {
      setMode("longBreak");
      setTimeout(() => longBreakRef.current?.focus(), 0);
    } else {
      setMode("pomodoro");
      setTimeout(() => pomodoroRef.current?.focus(), 0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[rgb(255,255,255,0.1)] w-[500px] rounded">
        <div className="flex gap-7 justify-center text-white p-5">
          <button
            className={`cursor-pointer py-0.5 px-3 rounded-md ${
              mode === "pomodoro" ? "bg-[#00000026]" : ""
            }`}
            onClick={() => setMode("pomodoro")}
          >
            Pomodoro
          </button>

          <button
            className={`cursor-pointer py-0.5 px-3 rounded-md ${
              mode === "shortBreak" ? "bg-[#00000026]" : ""
            }`}
            onClick={() => setMode("shortBreak")}
          >
            Short Break
          </button>

          <button
            className={`cursor-pointer py-0.5 px-3 rounded-md ${
              mode === "longBreak" ? "bg-[#00000026]" : ""
            }`}
            onClick={() => setMode("longBreak")}
          >
            Long Break
          </button>
        </div>

        <div className="flex justify-center text-9xl text-white font-medium">
          <p>{formatTime(timer)}</p>
        </div>

        <div className="flex justify-center ml-15 mt-8 gap-16">
          <button
            className={` bg-white font-semibold text-2xl 
              px-12 py-2 rounded text-center cursor-pointer transition-all 
              duration-200 active:translate-y-[3px] mb-10
              ${statusBtn ? "mt-1.5" : "shadow-[0px_6px_0px_hsl(358,0%,92%)]"}`}
            onClick={handleStatusBtn}
          >
            {statusBtn ? "PAUSE" : "START"}
          </button>

          <button
            className={`transition-opacity duration-500 ${
              statusBtn
                ? "opacity-100 mb-3"
                : "opacity-0 pointer-events-none mb-3"
            }`}
            onClick={handleSkip}
          >
            <img
              src="https://pomofocus.io/icons/next-white3.png"
              alt="skip"
              className="w-[22px] mb-5 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerCard;
