import React, { useEffect, useState } from "react";
import profile from "../img/p2.jpg";
import Comment from "./Comment";
import axios from "axios";

const Comments = ({ videoId }) => {
  const [comment, setcomment] = useState("");
  const [allComments, setallComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);

        setallComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = axios.post("/comments/", {
      videoId,
      desc: comment,
    });
    setcomment(res.data);
  };

  return (
    <section className="mt-5">
      <article className="flex gap-5">
        <img src={profile} alt="" className="rounded-full h-10 w-10" />
        <input
          type="text"
          placeholder="Add a comment ..."
          className="bg-transparent p-1 focus:outline-none "
          onChange={(e) => setcomment(e.target.value)}
        />
        <button
          className="bg-red-800 p-2 rounded hover:bg-red-600"
          onClick={handleSubmit}
        >
          Add Comment
        </button>
      </article>
      {allComments.map((comment) => {
        return (
          <Comment
            userid={comment.userId}
            videoid={comment.videoId}
            desc={comment.desc}
            key={comment._id}
            createdat={comment.createdAt}
          />
        );
      })}
    </section>
  );
};

export default Comments;
