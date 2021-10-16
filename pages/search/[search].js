import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Card from "../../components/card";

export default function Search() {
  const router = useRouter();
  const { userSearch: search } = router.query;
  const results = fakeResults; // assuming replace with redux functionality or api calls

  const [filteredResults, setFilteredResults] = useState(results);
  const [resultsPerPage, setResultsPerPage] = useState(9);

  return (
    <div>
      <div className="  grid grid-cols-1 lg:grid-cols-5  ">
        {/* filters */}
        <div className=" lg:col-span-1 pt-16 d-hide invisible lg:visible  ">
          <Filters />
        </div>
        {/* Results */}
        <div className=" col-span-1 lg:col-span-4  pt-5  ">
          <p>
            Search results for &quot;<strong>{search}</strong>&quot; :
          </p>
          <div className=" pt-4 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-px gap-y-8   max-w-full  ">
            {filteredResults.slice(0, resultsPerPage).map((cardInfo, index) => {
              return (
                <div className=" max-w-xs" key={index}>
                  {" "}
                  <Card {...cardInfo} />{" "}
                </div>
              );
            })}
          </div>
          <div className="col-span-full flex content-center items-center justify-center my-8">
            <button
              className="btn-secondary"
              onClick={() => setResultsPerPage((prev) => prev + 9)}
            >
              {resultsPerPage > filteredResults.length
                ? "No more results"
                : "Load more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoResults({ message }) {
  return (
    <div className="text-xl">
      Sorry no results found for {message}. Try searching for different
      keywords.
    </div>
  );
}

function Filters() {
  return (
    <>
      <div
        className=" py-10 px-5 mx-3"
        style={{
          borderRadius: "10px",
          backgroundImage:
            "repeating-linear-gradient(-217deg, #FCEDE7 0% 2%, #fff 2% 3%)",
        }}
      >
        <h1 className="text-3xl font-normal">Filters</h1>
        <div className="flex mt-3">
          <Image
            src="/assets/svg/ic_arrow_up.svg"
            alt="upward pointing arrow"
            width="18"
            height="18"
          />
          <p className="ml-2">acceding</p>
        </div>
        <div className="flex mt-3">
          <Image
            src="/assets/svg/ic_arrow_down.svg"
            alt="upward pointing arrow"
            width="18"
            height="18"
          />
          <p className="ml-2">descending</p>
        </div>

        <div className="mt-3">
          <span className="">Sort by:</span>
          <div className="mt-3">
            <div>
              <label className="">
                <input
                  type="radio"
                  className="form-radio h-6 w-6 text-primary  border-solid border-2 border-primary "
                  name="radio"
                  value="1"
                />
                <span className="ml-3">Ratings</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="mt-3">
                <input
                  type="radio"
                  className="form-radio h-6 w-6 text-primary  border-solid border-2 border-primary "
                  name="radio"
                  value="2"
                />
                <span className="ml-3">Number of cards</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p>Number of cards:</p>
          <RangeSlider />
        </div>
      </div>
    </>
  );
}

function RangeSlider() {
  return (
    <div className="mt-2 flex items-center ">
      <span className="mr-3">0</span>
      <div
        style={{
          width: "150px",
          minWidth: "150px",
          height: "16px",
          maxHeight: "16px",
          border: "solid black 3px",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {/* left handle */}
        <div
          className=" cursor-pointer"
          style={{
            height: "24px",
            width: "24px",
            outline: "solid black 3px",
            backgroundColor: "white",
            borderRadius: "100%",
            position: "absolute",
            top: "-6px",
            left: "20%",
          }}
        ></div>
        {/* right handle */}
        <div
          className=" cursor-pointer"
          style={{
            height: "24px",
            width: "24px",
            outline: "solid black 3px",
            backgroundColor: "white",
            borderRadius: "100%",
            position: "absolute",
            top: "-6px",
            left: "60%",
          }}
        ></div>
      </div>
      <span className="ml-3">MAX</span>
    </div>
  );
}

// just for testing
const cardOne = {
  title: "Common French words",
  userName: "James joins",
  cardCount: Math.ceil(Math.random() * 1000),
  tags: ["french", "languages", "beginner"],
  description:
    "Must know french words even for none french learners because they are every where.",
  rating: Math.random() * 4,
};
const fakeResults = [];

for (let index = 0; index < 30; index++) {
  fakeResults.push({
    title: Math.ceil(Math.random() * 1000) + ": Common French words",
    userName: "James joins",
    cardCount: Math.ceil(Math.random() * 1000),
    tags: ["french", "languages", "beginner"],
    description:
      "Must know french words even for none french learners because they are every where.",
    rating: Math.random() * 4,
  });
}
