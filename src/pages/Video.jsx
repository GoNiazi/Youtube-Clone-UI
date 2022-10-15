import React, { useContext, useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import AddTaskIcon from "@mui/icons-material/AddTask";
import profile from "../img/p2.jpg";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModeContext } from "./../context/index";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  dislike,
} from "../redux/videoSlice.js";
import { subscription } from "../redux/userSlice.js";
import axios from "axios";
import { format } from "timeago.js";
import Recomendations from "../components/Recomendations";

const Video = () => {
  const { darkmode } = useContext(ModeContext);
  const path = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setchannel] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("im herer");
    dispatch(fetchStart());
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        console.log("videores", videoRes);
        dispatch(fetchSuccess(videoRes.data));
        const chnlRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        console.log("chnleores", chnlRes);
        setchannel(chnlRes.data);
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);
  const handlelike = async () => {
    console.log("im liked");
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handledislike = async () => {
    const res = await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };
  const handlesubscriibe = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  return (
    <main className="flex pl-5 gap-4">
      <section className="basis-9/12">
        <article>
          <div>
            <iframe
              width="100%"
              height="620"
              src={currentVideo.videoUrl}
              title="Youtube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h1 className="text-2xl mt-4">{currentVideo.title}</h1>
            <div className="flex justify-between mt-2">
              <p>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </p>
              <div className="flex gap-3 items-center">
                <button onClick={handlelike}>
                  {currentVideo.likes?.includes(currentUser._id) ? (
                    <ThumbUpIcon className="mr-1" />
                  ) : (
                    <ThumbUpOutlinedIcon className="mr-1" />
                  )}{" "}
                  {currentVideo.likes?.length}
                </button>
                <button onClick={handledislike}>
                  {currentVideo.dislikes?.includes(currentUser._id) ? (
                    <ThumbDownIcon className="mr-1" />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon className="mr-1" />
                  )}{" "}
                  {currentVideo.dislikes?.length}
                </button>
                <button>
                  <ReplyIcon className="mr-1" />
                  Share
                </button>
                <button>
                  <AddTaskIcon className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </article>
        <hr className="opacity-30 mt-5" />
        <article className="mt-5 flex">
          <img src={channel.img} alt="" className="rounded-full h-10 w-10" />
          <div className="flex flex-col w-full ml-2">
            <div className="flex justify-between">
              <h2 className="  font-bold ml-2 ">{channel.name}</h2>
              <button
                className={`bg-red-700 p-1  text-neutral-50 rounded hover:bg-red-800`}
                onClick={handlesubscriibe}
              >
                {currentUser.subscribedUsers?.includes(channel._id)
                  ? "Subscribed"
                  : "Subscribe"}
              </button>
            </div>

            <h4 className=" ml-2">{channel.subscribers}</h4>
            <p className=" ml-2 pt-1 text-sm mt-2">{currentVideo.desc}</p>
          </div>
        </article>
        <hr className="opacity-30 mt-5" />
        <Comments videoId={currentVideo._id} />
      </section>

      <section className="basis-3/12  ">
        <Recomendations tags={currentVideo.tags} />
      </section>
    </main>
  );
};

export default Video;
