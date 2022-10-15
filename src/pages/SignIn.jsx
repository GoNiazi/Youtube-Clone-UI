import React, { useContext, useState } from "react";
import { ModeContext } from "./../context/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.js";

const SignIn = () => {
  const { darkmode } = useContext(ModeContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const handlelogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      console.log("clicked");
      const res = await axios.post("/auth/signin", { name, password });
      console.log("response", res.data);
      dispatch(loginSuccess(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
  };
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log("res", res);
            dispatch(loginSuccess(res.data));
            // navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <section
        className={
          darkmode
            ? "bg-neutral-800 shadow-2xl shadow-neutral-900 h-7/8 w-2/5 p-2"
            : "bg-neutral-200 shadow-2xl shadow-neutral-300 h-3/4 w-2/5 "
        }
      >
        <article className="flex justify-center items-center flex-col mt-5 gap-4">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="text-lg">to continue to YouTube</p>
          <input
            type="text"
            placeholder="username"
            className="border border-2 border-gray-500 bg-transparent p-2 w-2/4"
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border border-2 border-gray-500 bg-transparent p-2 w-2/4"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="bg-gray-500 p-2 rounded hover:bg-gray-700 w-1/4"
            onClick={handlelogin}
          >
            Sign In
          </button>
          <h1 className="text-2xl font-semibold">or</h1>
          <button
            onClick={signInWithGoogle}
            className="bg-gray-500 p-2 rounded hover:bg-gray-700 w-2/4"
          >
            Sign in with Google
          </button>
          <h1 className="text-2xl font-semibold">or</h1>
          <input
            type="text"
            placeholder="username"
            className="border border-2 border-gray-500 bg-transparent p-2 w-2/4"
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="border border-2 border-gray-500 bg-transparent p-2 w-2/4"
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="border border-2 border-gray-500 bg-transparent p-2 w-2/4"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="bg-gray-500 p-2 rounded hover:bg-gray-700 w-1/4">
            Sign Up
          </button>
        </article>
      </section>
    </main>
  );
};

export default SignIn;
