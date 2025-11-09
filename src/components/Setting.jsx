import { useState } from "react";
import ToggleSwitch from "./UI/ToggleSwitch";

function Setting({
  onClose,
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  onPomodoroChange,
  onShortBreakChange,
  onLongBreakChange,
  longBreakInterval,
  onLongBreakIntervalChange,
  autoStartBreaks,
  onAutoStartBreaksChange,
  autoStartPomodoros,
  onAutoStartPomodorosChange,
}) {
  // 🧠 LocalStorage'тен алынган маанилерди баштапкы абалга коюу
  const getSavedSettings = () => {
    const saved = localStorage.getItem("pomodoroSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        pomodoro: parsed.pomodoroTime,
        shortBreak: parsed.shortBreakTime,
        longBreak: parsed.longBreakTime,
        longBreakInterval: parsed.longBreakInterval,
        autoStartBreaks: parsed.autoStartBreaks,
        autoStartPomodoros: parsed.autoStartPomodoros,
      };
    }
    return {
      pomodoro: pomodoroTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
      longBreakInterval,
      autoStartBreaks,
      autoStartPomodoros,
    };
  };

  const saved = getSavedSettings();

  const [localPomodoroTime, setLocalPomodoroTime] = useState(saved.pomodoro);
  const [localShortBreakTime, setLocalShortBreakTime] = useState(saved.shortBreak);
  const [localLongBreakTime, setLocalLongBreakTime] = useState(saved.longBreak);
  const [localLongBreakInterval, setLocalLongBreakInterval] = useState(saved.longBreakInterval);
  const [localAutoStartBreaks, setLocalAutoStartBreaks] = useState(saved.autoStartBreaks);
  const [localAutoStartPomodoros, setLocalAutoStartPomodoros] = useState(saved.autoStartPomodoros);

  const handleOk = () => {
    // ✅ Parent компонентке жана localStorage'ке сактоо
    onPomodoroChange(localPomodoroTime);
    onShortBreakChange(localShortBreakTime);
    onLongBreakChange(localLongBreakTime);
    onLongBreakIntervalChange(Number(localLongBreakInterval));
    onAutoStartBreaksChange(localAutoStartBreaks);
    onAutoStartPomodorosChange(localAutoStartPomodoros);

    localStorage.setItem(
      "pomodoroSettings",
      JSON.stringify({
        pomodoroTime: Number(localPomodoroTime),
        shortBreakTime: Number(localShortBreakTime),
        longBreakTime: Number(localLongBreakTime),
        longBreakInterval: Number(localLongBreakInterval),
        autoStartBreaks: localAutoStartBreaks,
        autoStartPomodoros: localAutoStartPomodoros,
      })
    );

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center max-w-[400px] rounded-xl shadow-lg">
        <div className="flex justify-center gap-40 py-2 pl-35">
          <h1 className="text-[#aaa] font-semibold">SETTING</h1>
          <button
            className="text-[#aaa] cursor-pointer rounded-md mr-2 hover:bg-gray-200 px-1.5"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <hr className="text-[#aaa] h-0.5" />

        <div className="gap-2 pl-5 mt-7">
          <h1 className="pt-3 font-bold text-[#555]">Time (minutes)</h1>
          <div className="flex justify-around">
            <div className="flex flex-col text-[#aaa]">
              <label>Pomodoro</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localPomodoroTime}
                onChange={(e) => setLocalPomodoroTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-[#aaa]">
              <label>Short Break</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localShortBreakTime}
                onChange={(e) => setLocalShortBreakTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-[#aaa]">
              <label>Long Break</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localLongBreakTime}
                onChange={(e) => setLocalLongBreakTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex ml-5.5 gap-39 my-5">
            <label className="text-[#555] font-bold">Auto Start Breaks</label>
            <ToggleSwitch
              checked={localAutoStartBreaks}
              onChange={() => setLocalAutoStartBreaks((prev) => !prev)}
            />
          </div>

          <div className="flex ml-5.5 gap-30 my-5">
            <label className="text-[#555] font-bold">Auto Start Pomodoros</label>
            <ToggleSwitch
              checked={localAutoStartPomodoros}
              onChange={() => setLocalAutoStartPomodoros((prev) => !prev)}
            />
          </div>

          <div className="flex ml-5.5 gap-33 mb-5">
            <label className="text-[#555] font-bold">Long Break Interval</label>
            <input
              type="number"
              className="p-2 max-w-18 bg-[#efefef] rounded-md text-black"
              value={localLongBreakInterval}
              onChange={(e) => setLocalLongBreakInterval(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-gray-100 flex justify-end rounded-xl">
          <button
            className="bg-[#45474B] py-1 px-4 rounded-xl my-3 mr-5 text-white font-semibold"
            onClick={handleOk}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
