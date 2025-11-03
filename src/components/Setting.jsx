import { useState } from "react";
import ToggleSwitch from "./UI/ToggleSwitch";

function Setting({
  onClose,
  pomodoroTime,
  shortBreakTime,
  onPomodoroChange,
  onShortBreakChange,
  onLongBreakChange,
}) {
  const [localPomodoroTime, setLocalPomodoroTime] = useState(pomodoroTime);
  const [localShortBreakTime, setLocalShortBreakTime] =
    useState(shortBreakTime);
  const [localLongBreakTime, setLocalLongBreakTime] = useState(shortBreakTime);

  const handlePomodoroChange = (e) => setLocalPomodoroTime(e.target.value);
  const handleShortBreakChange = (e) => setLocalShortBreakTime(e.target.value);
  const handleLongBreakChange = (e) => setLocalLongBreakTime(e.target.value);

  const handleOk = () => {
    onPomodoroChange(localPomodoroTime);
    onShortBreakChange(localShortBreakTime);
    onLongBreakChange(localLongBreakTime);

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center max-w-[400px] rounded-xl shadow-lg">
        <div className="flex justify-center gap-40 py-2 pl-35">
          <h1 className="text-[#aaa] font-semibold">SETTING</h1>
          <button
            className="text-[#aaa] cursor-pointer rounded-md mr-2 hover:bg-gray-200 p-0.5"
            onClick={onClose}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 384 512"
              class="w-5 h-5 text-black/30"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
            </svg>
          </button>
        </div>
        <hr className="text-[#aaa]" />

        <div className="pt-6 gap-2 pl-5">
          <div className="flex items-center gap-2">
            <svg
              className="mb-0.5 text-[#aaa] font-bold"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M464 256A208 208 0 1 1 48 256a208
               208 0 1 1 416 0zM0 256a256 256 0 1 0 512 
               0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 
               15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.
               4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-
               24-24-24s-24 10.7-24 24z"
              ></path>
            </svg>
            <h1 className="text-[#aaa] font-bold text-sm">Timer</h1>
          </div>
          <h1 className="pt-3 font-bold text-[#555]">Time (minutes)</h1>

          <div className="flex justify-around">
            <div className="flex flex-col">
              <label className="text-[#aaa] font-bold text-sm">Pomodoro</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localPomodoroTime}
                onChange={handlePomodoroChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#aaa] font-bold text-sm">Short Break</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localShortBreakTime}
                onChange={handleShortBreakChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#aaa] font-bold text-sm">Long Break</label>
              <input
                type="number"
                className="bg-[#efefef] w-23 rounded p-2.5 text-black"
                value={localLongBreakTime}
                onChange={handleLongBreakChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex ml-5.5 gap-39 my-5">
            <label className="text-[#555] font-bold">Auto Start Breaks</label>
            <ToggleSwitch />
          </div>

          <div className="flex ml-5.5 gap-30 my-5">
            <label className="text-[#555] font-bold">
              Auto Start Pomodoros
            </label>
            <ToggleSwitch />
          </div>

          <div className="flex ml-5.5 gap-33 mb-5">
            <label className="text-[#555] font-bold">Long Break interval</label>
            <input
              type="number"
              className="p-2 max-w-18 bg-[#efefef] rounded-md text-black"
            />
          </div>
        </div>

        <div className="bg-gray-100 flex justify-end rounded-xl">
          <button
            className="bg-[#45474B] py-1 px-4 rounded-xl my-3 mr-5 text-white font-semibold cursor-pointer"
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
