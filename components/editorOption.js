import Image from "next/image";

export default function EditorOption({ onClick, isActive, icon, className }) {
  return (
    <button
      className={`hover:bg-primary hover:bg-opacity-20 py-1 px-2 font-serif flex items-center h-full ${
        isActive ? "bg-primary bg-opacity-20" : ""
      }  ${className}`}
      onClick={onClick}
    >
      <Image src={icon} alt="Icon" width="20" height="20" />
    </button>
  );
}
