import React from "react";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="flex items-center justify-between h-16">
      <Link href="/" className="flex w-max">
        <img
          src="/FYT-logo.png"
          alt="tutoring company logo"
        />
      </Link>
      <Link href="/">Go back</Link>
    </header>
  )
};

