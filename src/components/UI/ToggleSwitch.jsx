import { useState } from "react";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">

      <button
        onClick={() => setIsOn(!isOn)}
        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
          isOn ? "bg-[hsla(87,59%,49%,.8)]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>

    </div>
  );
}

export default ToggleSwitch;
