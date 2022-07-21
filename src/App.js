import "./App.css";
import { useState } from "react";
import Navbar from "../src/components/Navbar.jsx";
import Menu from "../src/components/Menu.jsx";

function App() {
  const [darkmode, setdarkmode] = useState(true);
  return (
    <main className="flex flex-row">
      <Menu darkmode={darkmode} setdarkmode={setdarkmode} />
      <section className={`flex-col basis-10/12  `}>
        <Navbar darkmode={darkmode} />
        <section>Video cart</section>
      </section>
    </main>
  );
}

export default App;
