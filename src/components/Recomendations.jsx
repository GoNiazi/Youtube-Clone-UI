import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Recomendations = ({ tags }) => {
  const [videos, setvideos] = useState([]);
  console.log("im in rec");
  useEffect(() => {
    const fetchvideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      console.log("videos rec", res.data);
      setvideos(res.data);
      console.log("videos", videos);
    };
    fetchvideos();
  }, [tags]);
  return (
    <>
      {videos.map((video) => {
        return <Card key={video._id} type="rec" video={video} from="rec" />;
      })}
    </>
  );
};

export default Recomendations;
