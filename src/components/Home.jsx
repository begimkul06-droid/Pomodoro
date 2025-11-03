import { useState } from "react";
import Button from "./UI/Button";
import Setting from "./setting";
import TimerCard from "./TimerCard";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(1 * 60);
  const [longBreakTime, setLongBreakTime] = useState(1 * 60);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("pomodoro");

  const openModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  const handlePomodorChange = (minutes) => {
    setPomodoroTime(minutes * 60);
  };
  const handleShortBreakChange = (minutes) => {
    setShortBreakTime(minutes * 60);
  };
  const handleLongBreakChange = (minutes) => {
    setLongBreakTime(minutes * 60);
  };

  const handleProgress = (value) => {
    setProgress(value);
  };

  const bgHome =
    mode === "pomodoro"
      ? "bg-[rgb(186,73,73)] text-[rgb(186,73,73)]"
      : mode === "shortBreak"
      ? "bg-[rgb(76,145,149)] text-[rgb(76,145,149)]"
      : mode === "longBreak"
      ? "bg-[rgb(69,124,163)] text-[rgb(69,124,163)]"
      : "bg-[rgb(186,73,73)] text-[rgb(186,73,73)]";

  return (
    <div
      className={`flex flex-col px-70 h-screen justify-self-center ${bgHome}`}
    >
      <div>
        <div className="flex justify-around gap-100">
          <div className="flex p-3 gap-1.5">
            <img
              src="https://pomofocus.io/images/icon-white2.png"
              alt="pomofocus icon"
              className="w-5 h-5 my-1.5"
            />
            <h1 className="text-xl text-white font-semibold">Pomofocus</h1>
          </div>

          <div className="pt-2">
            <Button onClick={openModal}>
              <img
                src="https://pomofocus.io/icons/config-white.png"
                alt="config icon"
                className="w-4 h-4 "
              />
              Setting
            </Button>
            {isOpen && (
              <Setting
                onClose={closeModal}
                pomodoroTime={pomodoroTime / 60} 
                onPomodoroChange={handlePomodorChange}
                onShortBreakChange={handleShortBreakChange}
                onLongBreakChange={handleLongBreakChange}
              />
            )}
          </div>
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
        onProgress={handleProgress}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}

export default Home;
