import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ModeContext } from "../context/index.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import profile from "../img/p2.jpg";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { darkmode, setdarkmode } = useContext(ModeContext);
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentuser", currentUser);
  const name = currentUser.name.split(" ");
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const [q, setq] = useState("");

  return (
    <>
      <section
        className={`w-full ${
          darkmode
            ? "bg-zinc-800 text-neutral-50"
            : " text-zinc-900 bg-neutral-100"
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
            onChange={(e) => setq(e.target.value)}
          />
          <SearchIcon
            className="self-center"
            onClick={() => navigate(`/search?q=${q}`)}
          />
        </article>
        {currentUser ? (
          <section className="flex justify-between items-center flex-row mr-20 w-32  ">
            <VideoCallIcon onClick={() => setopen(true)} />
            <img
              src={currentUser.img}
              alt=""
              className="rounded-full h-10 w-10"
            />
            <h3>{name[0]}</h3>
          </section>
        ) : (
          <Link to="signin" style={{ display: "flex", alignItems: "center" }}>
            <button className="border-solid border-2 border-sky-500 justify-center items-center flex w-30 p-1 rounded self-center mr-4">
              <AccountCircleIcon />
              SIGN IN
            </button>
          </Link>
        )}
      </section>
      {open && <Upload setOpen={setopen} />}
    </>
  );
};

export default Navbar;
