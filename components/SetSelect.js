import { useState } from "react";
import Image from "next/image";

import arrowDownSvg from "../public/assets/arrow-down.svg";

export default function SetSelect({
  setsList,
  onSelect,
  searchValue,
  onSearchValueChange,
}) {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [data, setData] = useState(setsList);

  const handleSearch = (e) => {
    onSearchValueChange(e.target.value);
    setData(
      setsList.filter((set) =>
        set.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setIsSelectActive(true);
  };

  const handleSelect = (set) => {
    onSelect(set);
    onSearchValueChange(set.title);
    setIsSelectActive(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          className="w-full border-black border-2 rounded text-lg px-2 py-1 z-10 outline-none"
          placeholder="Set Name"
        />
        <button
          className="absolute top-0 right-0 h-full flex justify-center items-center 
               border-l-2 border-black rounded p-2 "
          onClick={() => setIsSelectActive((prev) => !prev)}
        >
          <Image src={arrowDownSvg} width="50" height="30" alt="drop down" />
        </button>
      </div>
      <div
        className={`w-full absolute z-10  overflow-y-auto border-2 border-t-0 border-black rounded-b-md
            transition-all duration-100 ${
              isSelectActive
                ? "opacity-1 pointer-events-auto bg-white"
                : "opacity-0 pointer-events-none"
            }`}
      >
        {data.map((set, index) => {
          return (
            <div
              key={index}
              className=" cursor-pointer w-full hover:bg-primary hover:bg-opacity-20"
              onClick={() => handleSelect(set)}
            >
              <label className="cursor-pointer px-2 py-1 text-lg">
                {set.title}
              </label>
              {index < data.length - 1 && <hr />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
