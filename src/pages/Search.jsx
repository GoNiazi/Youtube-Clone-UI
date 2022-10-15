import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
const Search = () => {
  const [videos, setvideos] = useState([]);
  console.log(useLocation());
  const query = useLocation().search;
  console.log(query);
  useEffect(() => {
    const fetchvideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setvideos(res.data);
    };
    fetchvideos();
  }, [query]);
  return (
    <div>
      {videos.map((video) => {
        return <Card video={video} />;
      })}
    </div>
  );
};

export default Search;
