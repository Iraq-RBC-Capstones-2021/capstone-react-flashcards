import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Card from "../../components/card";

export default function Search() {
  const router = useRouter();
  const { search } = router.query;
  const results = fakeResults; // assuming replace with redux functionality or api calls

  const [filteredResults, setFilteredResults] = useState(results);
  const [resultsPerPage, setResultsPerPage] = useState(9);
  const [filters, setFilters] = useState({
    filtered: false,
    order: "descend" || "ascend",
    sortBy: "numOfCards" || "ratings",
    numOfCardsBetween: { start: 0, end: "max" },
  });

  useEffect(() => {
    if (filters.filtered) {
      setFilteredResults((prev) =>
        prev.sort((a, b) => {
          if (
            filters.sortBy === "numOfCards"
              ? a.cardCount > b.cardCount
              : a.rating > b.rating
          ) {
            return filters.order === "ascend" ? 1 : -1;
          } else {
            return filters.order === "ascend" ? -1 : 1;
          }
        })
      );
    }
  }, [filters]);

  return (
    <div>
      <div className="  grid grid-cols-1 lg:grid-cols-5 w-full  ">
        {/* filters */}
        <div className=" lg:col-span-1 pt-16 d-hide invisible lg:visible  ">
          <div
            className=" py-10 px-5 mx-3"
            style={{
              borderRadius: "10px",
              backgroundImage:
                "repeating-linear-gradient(-217deg, #FCEDE7 0% 2%, #fff 2% 3%)",
            }}
          >
            <h1 className="text-3xl font-normal">Filters</h1>
            <button
              onClick={() => {
                setFilters((prev) => {
                  return { ...prev, filtered: true, order: "ascend" };
                });
              }}
              className="  flex mt-3 focus:ring-2 focus:ring-primary "
            >
              <Image
                src="/assets/svg/ic_arrow_up.svg"
                alt="upward pointing arrow"
                width="18"
                height="18"
              />
              <p className="ml-2">ascending</p>
            </button>
            <button
              onClick={() => {
                setFilters((prev) => {
                  return { ...prev, filtered: true, order: "descend" };
                });
              }}
              className=" flex mt-3 focus:ring-2 focus:ring-primary"
            >
              <Image
                src="/assets/svg/ic_arrow_down.svg"
                alt="upward pointing arrow"
                width="18"
                height="18"
                className=" border-2 border-solid border-black p-2"
              />
              <p className="ml-2">descending</p>
            </button>

            <div className="mt-3">
              <form
                onChange={(e) => {
                  setFilters((prev) => {
                    return { ...prev, filtered: true, sortBy: e.target.value };
                  });
                }}
              >
                <span className="">Sort by:</span>
                <div className="mt-3">
                  <div>
                    <label>
                      <input
                        type="radio"
                        className="form-radio h-6 w-6 text-primary  border-solid border-2 border-primary  "
                        name="radio"
                        value="ratings"
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
                        value="numOfCards"
                      />
                      <span className="ml-3">Number of cards</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-3">
              <p>Number of cards:</p>
              <RangeSlider />
            </div>
          </div>
        </div>
        {/* Results */}
        <div className=" col-span-1 lg:col-span-4  pt-5  ">
          <p>
            Search results for &quot;<strong>{search}</strong>&quot; :
          </p>
          <div className=" pt-4 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-px gap-y-8">
            {filteredResults.slice(0, resultsPerPage).map((cardInfo, index) => {
              return (
                <div className=" max-w-xs" key={index}>
                  {" "}
                  <Card {...cardInfo} /> {cardInfo.rating}
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
const fakeResults = [];

for (let index = 0; index < 30; index++) {
  fakeResults.push({
    title: Math.ceil(Math.random() * 1000) + ": Common French words",
    userName: "James joins",
    cardCount: Math.ceil(Math.random() * 1000),
    tags: ["french", "languages", "beginner"],
    description:
      "Must know french words even for none french learners because they are every where.",
    rating: Math.ceil(Math.random() * 5),
  });
}
