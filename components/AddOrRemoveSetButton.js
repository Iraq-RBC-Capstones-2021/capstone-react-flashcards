import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSetToLibrary, removeSetFromLibrary } from "../store/sets/setsSlice";

export default function AddOrRemoveSetButton({ setId, className }) {
  const libraryInfoIds = useSelector((state) => state.sets.data.libraryInfoIds);
  const dispatch = useDispatch();

  const [isInLibrary, setIsInlibrary] = useState();

  useEffect(() => {
    if (libraryInfoIds.some((set) => set.setId === setId)) {
      setIsInlibrary(true);
    } else {
      setIsInlibrary(false);
    }
  }, [setId, libraryInfoIds]);

  const addOrRemoveSet = () => {
    if (isInLibrary) {
      dispatch(removeSetFromLibrary(setId));
    } else {
      dispatch(addSetToLibrary(setId));
    }
  };

  return (
    <button
      className={`btn-primary ${className}`}
      onClick={addOrRemoveSet}
      type="button"
    >
      {isInLibrary ? "Remove From Library" : "Add To Library"}
    </button>
  );
}
