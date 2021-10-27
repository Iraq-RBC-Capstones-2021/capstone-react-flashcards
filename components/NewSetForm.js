import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CategoriesSelect from "./CategoriesSelect";

const categories = ["English", "Math", "Biology"];

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  cover: yup
    .mixed()
    .test("type", "Please upload a valid image", (value) => {
      if (!value[0]) return true;
      return value && value[0].type.includes("image");
    })
    .test("type", "Size must less or equal to 200kb", (value) => {
      if (!value[0]) return true;
      return value && value[0].size <= 200000;
    }),
});

export default function NewSetForm({ onSetInfoSubmit }) {
  const [currentCategories, setCurrentCategories] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCategoriesSelect = (categories) => {
    if (categories.length === 0) {
      setCurrentCategories({
        categories: ["uncategorized"],
      });
    }
    setCurrentCategories({ categories });
  };

  const handleCreateSet = (data) => {
    if (
      currentCategories === undefined ||
      currentCategories.categories.length === 0
    ) {
      onSetInfoSubmit({
        ...data,
        categories: ["uncategorized"],
      });
    } else {
      onSetInfoSubmit({ ...currentCategories, ...data });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCreateSet)}
        className="flex flex-col gap-2 mb-2"
      >
        <input
          type="text"
          name="title"
          {...register("title")}
          className="w-full border-black border-2 rounded text-lg px-2 py-1 z-10 outline-none"
          placeholder="Set's Name"
        />
        {errors.name?.type === "required" && (
          <h5 className="text-sm text-primary">Set Name is required</h5>
        )}
        <div className="flex items-center justify-center gap-5 ">
          <label className="text-base w-28">Cover Image:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("cover")}
            className="w-full border-black border-2 rounded text-lg px-2 py-1 z-10 outline-none"
            placeholder="Cover Image Path"
          />
        </div>

        {errors.cover && (
          <h5 className="text-sm text-primary">{errors.cover.message}</h5>
        )}

        <input
          type="text"
          name="description"
          {...register("description")}
          className="w-full border-black border-2 rounded text-lg px-2 py-1 outline-none"
          placeholder="Description"
        />
        <div>
          <CategoriesSelect
            categoryList={categories}
            onSelect={handleCategoriesSelect}
          />
        </div>
        <div className="flex justify-center items-center mt-3 ">
          <button className="btn-primary w-64" type="submit">
            Create Set
          </button>
        </div>
      </form>

      <hr />
    </div>
  );
}
