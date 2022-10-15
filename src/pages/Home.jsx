import React, { useContext, useState, useEffect } from "react";
import Card from "../components/Card";
import { ModeContext } from "../context/index.jsx";
import axios from "axios";

const Home = ({ type }) => {
  const { darkmode } = useContext(ModeContext);
  const [videos, setvideos] = useState([]);
  useEffect(() => {
    const fetchvideos = async () => {
      console.log("type", type);
      const res = await axios.get(`/videos/${type}`);
      setvideos(res.data);
      console.log(videos);
    };
    fetchvideos();
  }, [type]);
  return (
    <section
      className={`flex flex-wrap justify-between ${
        darkmode
          ? "bg-zinc-900 text-neutral-50"
          : " text-zinc-900 bg-neutral-50"
      }`}
    >
      {videos.map((video) => {
        return <Card video={video} />;
      })}
    </section>
  );
};

export default Home;
