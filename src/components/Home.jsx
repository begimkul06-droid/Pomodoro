import { useState } from "react";
import Button from "./UI/Button";
import Setting from "./Setting";
import TimerCard from "./TimerCard";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(1 * 60);
  const [longBreakTime, setLongBreakTime] = useState(1 * 60);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("pomodoro");
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleProgress = (value) => setProgress(value);

  const bgHome =
    mode === "pomodoro"
      ? "bg-[rgb(186,73,73)]"
      : mode === "shortBreak"
      ? "bg-[rgb(76,145,149)]"
      : "bg-[rgb(69,124,163)]";

  return (
    <div className={`flex flex-col px-70 h-screen justify-self-center ${bgHome}`}>
      <div className="flex justify-around gap-100">
        <div className="flex p-3 gap-1.5">
          <img
            src="https://pomofocus.io/images/icon-white2.png"
            className="w-5 h-5 my-1.5"
          />
          <h1 className="text-xl text-white font-semibold">Pomofocus</h1>
        </div>

        <div className="pt-2">
          <Button onClick={openModal}>
            <img
              src="https://pomofocus.io/icons/config-white.png"
              className="w-4 h-4"
            />
            Setting
          </Button>
          {isOpen && (
            <Setting
              onClose={closeModal}
              pomodoroTime={pomodoroTime / 60}
              shortBreakTime={shortBreakTime / 60}
              longBreakTime={longBreakTime / 60}
              longBreakInterval={longBreakInterval}
              onPomodoroChange={(v) => setPomodoroTime(v * 60)}
              onShortBreakChange={(v) => setShortBreakTime(v * 60)}
              onLongBreakChange={(v) => setLongBreakTime(v * 60)}
              onLongBreakIntervalChange={(v) => setLongBreakInterval(Number(v))}
              autoStartBreaks={autoStartBreaks}
              onAutoStartBreaksChange={setAutoStartBreaks}
              autoStartPomodoros={autoStartPomodoros}
              onAutoStartPomodorosChange={setAutoStartPomodoros}
            />
          )}
        </div>
      </div>

      <div className="relative w-full h-0.5 bg-[#0000001A] mb-10 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <TimerCard
        pomodoroTime={pomodoroTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        longBreakInterval={longBreakInterval}
        mode={mode}
        setMode={setMode}
        onProgress={handleProgress}
        autoStartBreaks={autoStartBreaks}
        autoStartPomodoros={autoStartPomodoros}
      />
    </div>
  );
}

export default Home;
