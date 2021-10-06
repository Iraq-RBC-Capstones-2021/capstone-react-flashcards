import React from "react";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import "tailwindcss/tailwind.css";

export default function Section({
  title = "Main title",
  short = "short description",
  text = "Body placeholder for text paragraph. A paragraph is a self-contained unit of text dealing with a particular point or idea.",
  imageUrl = "/assets/svg/striped-bg.svg",
  url = "/",
}) {
  return (
    <div className="grid md:grid-cols-2 max-w-7xl">
      {/* left */}
      <div className=" flex flex-col justify-center items-center">
        <div>
          <div className="flex flex-row ">
            <Image
              src="/assets/svg/star.svg"
              alt="black star"
              width={32}
              height={32}
            />
            <div className=" ml-3">
              <h1 className="font-bold">{title}</h1>
              <h1 className=" text-gray-500 text-sm">{short}</h1>
            </div>
          </div>
          <p className=" max-w-xs py-2 text-gray-500 text-sm">{text}</p>

          <div className="py-2 flex">
            <Link href={`${url}`}>
              <span className="font-bold mr-2">Learn more</span>
            </Link>
            <Image
              src="/assets/svg/section-title-header.svg"
              alt="black star"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="  flex flex-col justify-center items-center">
        <div className=" relative my-6 w-8/12	 h-96 border-solid border-2 border-black rounded-md">
          <div className="mx-3 flex">
            <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
            <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
            <div className=" m-1 w-3 h-3 border border-1 border-black rounded-full"></div>
          </div>
          <Image
            className=""
            src={`${imageUrl}`}
            alt="feater description"
            layout="fill"
            objectFit="contain"
          />
          <button className=' absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"'>
            Preview &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
