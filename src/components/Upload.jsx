import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Upload = ({ setOpen }) => {
  const [video, setvideo] = useState(undefined);
  const [img, setimg] = useState(undefined);
  const [inputs, setinputs] = useState({});
  const [tags, settags] = useState([]);
  const [imgprec, setimgprec] = useState(0);
  const [videoprec, setvideoprec] = useState(0);
  const navigate = useNavigate();
  const handleTags = (e) => {
    settags(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setinputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "videoUrl"
          ? setvideoprec(Math.round(progress))
          : setimgprec(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setinputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);
  return (
    <section
      className="w-full h-full absolute bottom-0 left-0  flex  items-center justify-center"
      style={{ background: " #000000a7" }}
    >
      <article
        className=" bg-neutral-800 p-4 flex flex-column relative"
        style={{ width: "600px", height: " 600px" }}
      >
        <div
          className="absolute top-2 right-2 hover:text-slate-500 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </div>
        <div className=" flex flex-col gap-4 w-full">
          <h1 className="text-3xl  mt-4 w-full text-center ">
            Upload a new Video
          </h1>
          <label htmlFor="">Video:</label>
          {videoprec > 0 ? (
            "uploading" + videoprec + "%"
          ) : (
            <input
              type="file"
              className="p-1 border border-2 border-b-white "
              accept="video/*"
              onChange={(e) => setvideo(e.target.files[0])}
            />
          )}

          <input
            type="text"
            placeholder="Title "
            name="title"
            className="p-1 border border-2 border-b-white bg-transparent"
            onChange={handleChange}
          />
          <textarea
            name="desc"
            placeholder="Description"
            className="p-1 border border-2 border-b-white bg-transparent"
            rows="4"
            name="desc"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="">Tags:</label>
          <input
            type="text"
            placeholder="Separate the tags with commas. "
            className="p-1 border border-2 border-b-white bg-transparent"
            onChange={handleTags}
          />
          <label htmlFor="">Thumbnail:</label>
          {imgprec > 0 ? (
            "Uploading " + imgprec + "%"
          ) : (
            <input
              type="file"
              className="p-1 border border-2 border-b-white "
              accept="image/*"
              onChange={(e) => setimg(e.target.files[0])}
            />
          )}

          <button
            className="bg-black text-white p-2 hover:bg-slate-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </article>
    </section>
  );
};

export default Upload;
