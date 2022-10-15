import React, { useEffect, useState } from "react";
import profile from "../img/p2.jpg";
import { format } from "timeago.js";
import axios from "axios";

const Comment = ({ videoid, userid, desc, createdat }) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/find/${userid}`);
      setuser(res.data);
    };
    fetchUser();
  }, [videoid]);
  return (
    <article className="flex flex-row mt-4">
      <img
        src={user.img ? user.img : profile}
        alt=""
        className="rounded-full h-10 w-10"
      />
      <div className="flex flex-col align-start ml-2">
        <div className="flex gap-3">
          <h2 className="  font-bold ">Komail Dev</h2>
          <h4 className=" m ">{format(createdat)}</h4>
        </div>

        <p className=" ml-2 pt-1 text-sm">{desc}</p>
      </div>
    </article>
  );
};

export default Comment;
