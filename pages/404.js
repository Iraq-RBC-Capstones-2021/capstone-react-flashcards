import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="font-semibold text-2xl">404</h1>
      <p className="mx-4 w-96 text-center text-xl mb-8">
        Sorry, the page you wanted was not found. try serching for something
        else.
      </p>
      <Link href="/">
        <a className="btn-secondary">Go To Home</a>
      </Link>
    </div>
  );
}
