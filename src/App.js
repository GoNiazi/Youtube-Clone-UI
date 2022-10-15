import "./App.css";
import { useState, useContext } from "react";
import Navbar from "../src/components/Navbar.jsx";
import Menu from "../src/components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeContext } from "./context/index.jsx";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search.jsx";
function App() {
  const [darkmode, setdarkmode] = useState(true);
  console.log("darkmode: ", darkmode);
  return (
    <ModeContext.Provider value={{ darkmode, setdarkmode }}>
      <main
        className={`flex flex-row ${
          darkmode
            ? "bg-zinc-900 text-neutral-50"
            : " text-zinc-900 bg-neutral-50"
        }`}
      >
        <BrowserRouter>
          <Menu />
          <section className={`flex-col basis-10/12  `}>
            <Navbar />
            <section className="pl-3 pr-3 pt-3">
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="search" element={<Search />} />

                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </section>
          </section>
        </BrowserRouter>
      </main>
    </ModeContext.Provider>
  );
}

export default App;
