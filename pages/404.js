import React from "react";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="font-semibold text-2xl">404</h1>
      <p className="mx-4 w-96 text-center text-xl">
        Sorry, the page you wanted was not found. try serching for something
        else.
      </p>
      <button className="shadow-lg my-2 px-3 py-1.5 font-semibold text-base border-black border-solid border-2 rounded-lg ">
        <Link href="/">Go To Home</Link>
      </button>
    </div>
  );
}
