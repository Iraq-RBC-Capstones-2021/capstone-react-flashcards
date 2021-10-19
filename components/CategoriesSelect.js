import Image from "next/image";
import { useState } from "react";

import arrowDownSvg from "../public/assets/arrow-down.svg";

export default function CategoriesSelect({
  categoryList,
  intialValue = [],
  onSelect,
}) {
  const [categories, setCategories] = useState(categoryList);
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(intialValue);

  const handleSelect = (category) => {
    if (!selectedCategories.includes(category)) {
      const data = [...selectedCategories, category];
      setSelectedCategories(data);
      onSelect(data);
    } else {
      const filtredCategories = selectedCategories.filter(
        (value) => value !== category
      );

      setSelectedCategories(filtredCategories);
      onSelect(filtredCategories);
    }
    setSearchValue("");
    setCategories(categoryList);
  };

  const handleSearch = (e) => {
    setIsDropDownActive(true);
    setSearchValue(e.target.value);
    if (searchValue !== "") {
      setCategories(
        categoryList.filter((value) =>
          value.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setCategories(categoryList);
    }
  };

  const handleRemove = (selection) => {
    const filtredCategories = selectedCategories.filter(
      (value) => value.id !== selection.id
    );

    setSelectedCategories(filtredCategories);

    onSelect(filtredCategories);
  };

  return (
    <div className="relative h-12">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          className="w-full border-black border-2 rounded text-lg px-2 py-1 z-10 outline-none"
          placeholder="Categories"
        />
        <button
          className="absolute top-0 right-0 h-full flex justify-center items-center 
               border-l-2 border-black rounded p-2 "
          type="button"
          onClick={() => setIsDropDownActive((prev) => !prev)}
        >
          <Image src={arrowDownSvg} width="50" height="30" alt="drop down" />
        </button>
      </div>
      <div
        className={`w-full absolute z-10  overflow-y-auto border-2 border-t-0 border-black rounded-b-md
            transition-all duration-100 ${
              isDropDownActive
                ? "opacity-1 pointer-events-auto bg-white"
                : "opacity-0 pointer-events-none"
            }`}
      >
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className={` cursor-pointer w-full hover:bg-primary hover:bg-opacity-20 ${
                selectedCategories.includes(category)
                  ? "bg-primary bg-opacity-10"
                  : ""
              }`}
              onClick={() => handleSelect(category)}
            >
              <label className="cursor-pointer px-2 py-1 text-lg">
                {category.name}
              </label>
              {index < categoryList.length - 1 && <hr />}
            </div>
          );
        })}
      </div>
      <div className="flex gap-1 mt-1">
        {selectedCategories.map((selection, index) => (
          <span
            key={index}
            onClick={() => handleRemove(selection)}
            className="border pl-1 pr-4  relative rounded-xl border-black text-xs cursor-pointer"
          >
            {selection.name}
            <label className="text-xs absolute bottom-1 right-1 cursor-pointer">
              x
            </label>
          </span>
        ))}
      </div>
    </div>
  );
}
