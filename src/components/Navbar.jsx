import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ darkmode }) => {
  return (
    <section
      className={`w-full ${
        darkmode
          ? "bg-zinc-900 text-neutral-50"
          : " text-zinc-900 bg-neutral-50"
      } flex flex-row h-14 justify-end relative`}
    >
      <article
        className={`border-solid border-2 ${
          darkmode ? "border-neutral-50" : "border-zinc-900"
        }  self-center absolute left-0 right-0 m-auto w-2/5  flex justify-between`}
      >
        <input
          type="text"
          placeholder="Search"
          className="self-center bg-transparent p-1 focus:outline-none"
        />
        <SearchIcon className="self-center" />
      </article>
      <button className="border-solid border-2 border-sky-500 justify-center items-center flex w-30 p-1 rounded self-center mr-4">
        <AccountCircleIcon />
        SIGN IN
      </button>
    </section>
  );
};

export default Navbar;
