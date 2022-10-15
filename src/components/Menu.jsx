import React, { useContext } from "react";
import logo from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import HistoryIcon from "@mui/icons-material/History";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ModeContext } from "../context/index.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Menu = () => {
  const { darkmode, setdarkmode } = useContext(ModeContext);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={`basis-2/12 ${
        darkmode
          ? " bg-zinc-800 text-neutral-50"
          : " text-zinc-900 bg-neutral-100"
      } h-full `}
    >
      <section className="p-2 cursor-pointer">
        <Link to="/">
          <div className=" flex flex-row justify-center items-center">
            <img src={logo} className="h-7 mr-2" alt="logo" />
            <h3>YouTube</h3>
          </div>
        </Link>
        <section>
          <ul className="cursor-pointer ml-5 mt-6">
            <Link to="/">
              <li
                className={`flex flex-row mb-3 pt-1 pb-1 ${
                  darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
                }`}
              >
                <HomeIcon /> <h3 className="ml-8">Home</h3>
              </li>
            </Link>
            <Link to="trends">
              <li
                className={`flex flex-row mb-3 pt-1 pb-1 ${
                  darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
                }`}
              >
                <ExploreIcon /> <h3 className="ml-8">Explore</h3>
              </li>
            </Link>
            <Link to="subscriptions">
              <li
                className={`flex flex-row mb-3 pt-1 pb-1 ${
                  darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
                }`}
              >
                <SubscriptionsIcon /> <h3 className="ml-8">Subscription</h3>
              </li>
            </Link>
            <hr className="mt-4 mb-4 pl-3 pr-3 " />
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <VideoLibraryIcon /> <h3 className="ml-8">Library</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <HistoryIcon /> <h3 className="ml-8">History</h3>
            </li>

            {!currentUser && (
              <>
                <hr className="mt-4 mb-4 pl-3 pr-3 justify-center items-center" />
                <li className="flex flex-col">
                  <p className="w-41">
                    Sign in to like videos, comment and subscribe
                  </p>
                  <Link to="signin">
                    <button className="border-solid border-2 border-sky-500 justify-center items-center flex w-full p-2 rounded mt-2">
                      <AccountCircleIcon className="mr-2" />
                      SIGN IN
                    </button>
                  </Link>
                </li>
              </>
            )}

            <hr className="mt-4 mb-4 pl-3 pr-3" />
            <li className="mb-3 pt-1 pb-1">Best of YouTube</li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <LibraryMusicIcon /> <h3 className="ml-8">Music</h3>
            </li>
            <li className="flex flex-row mb-3">
              <SportsBasketballIcon /> <h3 className="ml-8">Sports</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <SportsEsportsIcon /> <h3 className="ml-8">Gaming</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <MovieCreationIcon /> <h3 className="ml-8">Movies</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <NewspaperIcon /> <h3 className="ml-8">News</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <LiveTvIcon /> <h3 className="ml-8">Live</h3>
            </li>
            <hr className="mt-4 mb-4 pl-3 pr-3" />
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <SettingsSuggestIcon /> <h3 className="ml-8">Setting</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <FlagIcon /> <h3 className="ml-8">Report</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
            >
              <HelpIcon /> <h3 className="ml-8">Help</h3>
            </li>
            <li
              className={`flex flex-row mb-3 pt-1 pb-1 ${
                darkmode ? "hover:bg-neutral-600" : "hover:bg-neutral-300"
              }`}
              onClick={() => setdarkmode(!darkmode)}
            >
              <SettingsBrightnessIcon /> <h3 className="ml-8">Light Mode</h3>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Menu;
