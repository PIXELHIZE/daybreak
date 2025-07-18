export default function Button({
  children,
  icon = null,
  onClick,
  type = "primary",
  style,
}) {
  const getBackgroundColor = () => {
    switch (type) {
      case "primary":
        return "bg-white text-black border-none";
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
      className={`px-4 py-2 rounded cursor-pointer ${getBackgroundColor()}`}
      style={style}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
