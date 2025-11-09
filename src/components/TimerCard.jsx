import { useEffect, useRef, useState, useMemo } from "react";

const formatTime = (commonSeconds) => {
  const minutes = Math.floor(commonSeconds / 60);
  const seconds = commonSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function TimerCard({
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  onProgress,
  mode,
  setMode,
  longBreakInterval,
  autoStartPomodoros,
  autoStartBreaks,
}) {
  // 🔹 LocalStorage’дан убакыт алуу
  const getSavedTimes = () => {
    const saved = localStorage.getItem("pomodoroSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        pomodoro: Number(parsed.pomodoroTime || pomodoroTime) * 60,
        shortBreak: Number(parsed.shortBreakTime || shortBreakTime) * 60,
        longBreak: Number(parsed.longBreakTime || longBreakTime) * 60,
      };
    }
    return {
      pomodoro: pomodoroTime * 60,
      shortBreak: shortBreakTime * 60,
      longBreak: longBreakTime * 60,
    };
  };

  // 🔹 useMemo — times ар render сайын өзгөрбөсүн
  const times = useMemo(() => getSavedTimes(), [pomodoroTime, shortBreakTime, longBreakTime]);

  const [timer, setTimer] = useState(
    mode === "pomodoro" ? times.pomodoro : mode === "shortBreak" ? times.shortBreak : times.longBreak
  );
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef(null);

  // 🔹 Mode өзгөргөндө таймерди жаңылоо
  useEffect(() => {
    setTimer(
      mode === "pomodoro" ? times.pomodoro : mode === "shortBreak" ? times.shortBreak : times.longBreak
    );
    onProgress(0);
    setIsRunning(
      (mode === "pomodoro" && pomodoroCount > 0 && autoStartPomodoros) ||
      ((mode === "shortBreak" || mode === "longBreak") && autoStartBreaks) ||
      false
    );
  }, [mode, times, pomodoroCount, autoStartPomodoros, autoStartBreaks]);

  // 🔹 Таймер иштеши
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      setTimer((prev) => {
        if (prev <= 1) {
          onProgress(100);
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          handleNext();
          return 0;
        }
        const total =
          mode === "pomodoro"
            ? times.pomodoro
            : mode === "shortBreak"
            ? times.shortBreak
            : times.longBreak;
        onProgress(((total - prev) / total) * 100);
        return prev - 1;
      });
    };

    intervalRef.current = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning, mode, times]);

  // 🔹 Кийинки этапка өтүү
  const handleNext = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    let nextMode;
    if (mode === "pomodoro") {
      const nextCount = pomodoroCount + 1;
      setPomodoroCount(nextCount);
      nextMode = nextCount % longBreakInterval === 0 ? "longBreak" : "shortBreak";
    } else {
      nextMode = "pomodoro";
    }

    const nextTimer =
      nextMode === "pomodoro"
        ? times.pomodoro
        : nextMode === "shortBreak"
        ? times.shortBreak
        : times.longBreak;

    setMode(nextMode);
    setTimer(nextTimer);
    onProgress(0);

    setIsRunning(
      (nextMode === "pomodoro" && autoStartPomodoros) ||
      ((nextMode === "shortBreak" || nextMode === "longBreak") && autoStartBreaks)
    );
  };

  // 🔹 Start / Pause кнопкасы
  const handleStartPause = () => {
    if (timer === 0) {
      const currentTimer =
        mode === "pomodoro"
          ? times.pomodoro
          : mode === "shortBreak"
          ? times.shortBreak
          : times.longBreak;
      setTimer(currentTimer);
      onProgress(0);
    }
    setIsRunning((prev) => !prev);
  };

  // 🔹 Skip кнопкасы
  const handleSkip = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    handleNext();
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
            className={`bg-white font-semibold text-2xl px-12 py-2 rounded text-center cursor-pointer transition-all duration-200 active:translate-y-[3px] mb-10 ${
              isRunning ? "mt-1.5" : "shadow-[0px_6px_0px_hsl(358,0%,92%)]"
            }
              ${mode === "pomodoro" ? "text-[rgb(186,73,73)]" : ""} ${
              mode === "shortBreak" ? "text-[rgb(76,145,149)]" : ""
            } ${mode === "longBreak" ? "text-[rgb(69,124,163)]" : ""}`}
            onClick={handleStartPause}
          >
            {isRunning ? "PAUSE" : "START"}
          </button>

          <button
            className={`transition-opacity duration-500 ${
              isRunning ? "opacity-100 mb-3" : "opacity-0 pointer-events-none mb-3"
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
      <p className="text-white">#{pomodoroCount}</p>
    </div>
  );
}

export default TimerCard;
