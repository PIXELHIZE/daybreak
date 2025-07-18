export default function Button({
  children,
  icon = null,
  onClick,
  type = "primary",
  style,
  className = "",
  disabled = false,
}) {
  const getBackgroundColor = () => {
    switch (type) {
      case "glass":
        return `
          bg-white/20 
          text-white 
          border-[3px] border-white/30 
          shadow-[inset_0px_4px_4.8px_6px_rgba(0,0,0,0.25)]
        `;
      case "primary":
        return `bg-white text-black border-none`;
      case "secondary":
        return "bg-transparent text-white border-2 border-white";
      case "filled":
        return "bg-white text-black";
      case "outline":
        return "bg-transparent text-white border-2 border-white";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded cursor-pointer ${getBackgroundColor()} ${
        disabled ? "opacity-50" : ""
      }`}
      style={{ cursor: disabled ? "auto" : "pointer", ...style }}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
