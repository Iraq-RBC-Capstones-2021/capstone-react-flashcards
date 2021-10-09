import React from "react";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";

export default function Section({
  title = "Main title",
  short,
  text = "Body placeholder for text paragraph. A paragraph is a self-contained unit of text dealing with a particular point or idea.",
  imageUrl = "/assets/svg/striped-bg.svg", // preferred aspect ratio = 1.35
  actionUrl = "/",
  action = false,
  star = false,
  frame = false,
  reverse = false,
  additionalFeatures = false,
  additionalFeatureOne = {
    title: "Feature name",
    short: "Short description",
  },
  additionalFeatureTwo = {
    title: "Feature name",
    short: "Short description",
  },
}) {
  return (
    <div className="grid w-11/12 md:w-3/4 md:grid-cols-2 md:min-h-500 justify-center content-center ">
      {/* left */}
      <div className=" flex flex-col justify-center items-center ">
        <div>
          <div className="flex flex-row ">
            {star ? (
              <Image
                src="/assets/svg/star.svg"
                alt="black star"
                width={32}
                height={32}
              />
            ) : null}
            <div className={`${star ? "ml-3" : ""}`}>
              <h1 className={`${short ? "" : "text-2xl"}  font-bold`}>
                {title}
              </h1>
              <h1 className=" text-gray-500 text-sm">{short}</h1>
            </div>
          </div>
          <p className=" max-w-xs py-2 text-gray-500 text-sm">{text}</p>
          {/* additional features */}
          {additionalFeatures ? (
            <div className="flex flex-row">
              <div className="py-3 mr-10">
                <Image
                  src="/assets/svg/star.svg"
                  alt="black star"
                  width={32}
                  height={32}
                />
                <h1 className="font-bold mt-3">{additionalFeatureOne.title}</h1>
                <h1 className=" text-gray-500 text-sm mt-2">
                  {additionalFeatureOne.short}
                </h1>
              </div>
              <div className="py-3">
                <Image
                  src="/assets/svg/star.svg"
                  alt="black star"
                  width={32}
                  height={32}
                />
                <h1 className="font-bold mt-3">{additionalFeatureTwo.title}</h1>
                <h1 className=" text-gray-500 text-sm mt-2">
                  {additionalFeatureTwo.short}
                </h1>
              </div>
            </div>
          ) : null}
          {action ? (
            <div className="py-2 flex mb-6">
              <Link href={`${actionUrl}`}>
                <span className="font-bold mr-2 ">Learn more</span>
              </Link>
              <Image
                src="/assets/svg/section-title-header.svg"
                alt="section pointer"
                width={16}
                height={16}
              />
            </div>
          ) : null}
        </div>
      </div>
      {/* right */}
      <div
        className={`${
          reverse ? "order-first" : ""
        }  flex flex-col justify-center items-center   `}
      >
        <div
          className={`${
            frame
              ? "border border-solid border-5 border-black rounded-lg "
              : null
          } relative overflow-hidden`}
        >
          {frame ? (
            <div className="mx-3 flex">
              <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
              <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
              <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
            </div>
          ) : null}
          <img src={`${imageUrl}`} alt="feater description" className="" />

          {action ? (
            <button className="btn-secondary absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href={`${actionUrl}`}>Preview</Link>
              {"   "}
              <Image
                className=" p-3"
                src="/assets/svg/icon-play.svg"
                alt="section pointer"
                width={16}
                height={16}
              />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
