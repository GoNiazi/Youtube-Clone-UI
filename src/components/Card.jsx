import React, { useEffect, useState } from "react";
import thumbnail from "../img/thumbnail.jpg";
import profile from "../img/p2.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
const Card = ({ type, video, from }) => {
  const [channel, setchannel] = useState({});
  console.log("videos in card", type);
  useEffect(() => {
    const fetchUser = async () => {
      const chnlRes = await axios.get(`/users/find/${video.userId}`);
      console.log("chnleperes", chnlRes);
      setchannel(chnlRes.data);
    };
    fetchUser();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`}>
      <section
        className={`${
          type === "rec"
            ? "w-80 cursor-pointer flex mb-2"
            : "w-80 cursor-pointer  mb-10"
        }`}
      >
        <div className={`${type === "rec" ? "w-2/4 h-13 " : "w-full h-13 "}`}>
          <img src={video.imgUrl} alt="img" />
        </div>
        <article
          className={`${
            type === "rec" ? "flex flex-row " : "flex flex-row mt-4"
          }`}
        >
          {type === "rec" ? (
            ""
          ) : (
            <img src={channel.img} alt="" className="rounded-full h-10 w-10" />
          )}

          <div className="flex flex-col align-start">
            <h2 className="  font-bold ml-2 ">{video.title}</h2>
            <h4 className=" ml-2 pt-1">{channel.name}</h4>
            <p className=" ml-2 pt-1 text-sm">
              {video.views} views • {format(video.createdAt)}
            </p>
          </div>
        </article>
      </section>
    </Link>
  );
};

export default Card;
