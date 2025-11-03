const Button = ({ children , onClick }) => {
  return (
    <button
      className="bg-[rgb(255,255,255,0.2)] text-white px-2 my-3 rounded   
               active:translate-y-1 active:scale-95 cursor-pointer flex items-center gap-1.5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
