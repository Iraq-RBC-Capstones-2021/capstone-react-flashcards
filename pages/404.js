import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="font-semibold text-2xl">404</h1>
      <p className="mx-4 w-96 text-center text-xl">
        Sorry, the page you wanted was not found. try searching for something
        else.
      </p>
      <button className="btn-secondary my-3">Go To Home</button>
    </div>
  );
}
