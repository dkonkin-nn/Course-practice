import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [activLogo, setActivLogo] = useState(null);

  function toggleIsOpen() {
    setIsOpen((open) => !open);
  }

  function onMouseEnter(logo) {
    setActivLogo(logo);
  }

  function onMouseLeave() {
    setActivLogo(null);
  }

  return (
    <>
      {isOpen ? (<span className="cross" onClick={toggleIsOpen}>&times;</span>) :
        (<button onClick={toggleIsOpen}>Начать</button>)}


      {isOpen && <>
        <h1>Vite + React = {count >= 3 ? "Love" : ""}</h1>

        <div className="logo-container">
          <img
            onMouseEnter={() => onMouseEnter("vite")}
            onMouseLeave={onMouseLeave}
            src="/vite.svg" className={`logo ${(count >= 1 || activLogo === "vite") && "active"}`} alt="Vite logo" />
          <p>+</p>
          <img
            onMouseEnter={() => onMouseEnter("react")}
            onMouseLeave={onMouseLeave}
            src="/react.svg" className={`logo ${(count >= 2 || activLogo === "react") && "active"}`} alt="React logo" />
          <p>=</p>
          <img
            onMouseEnter={() => onMouseEnter("love")}
            onMouseLeave={onMouseLeave}
            src="/love.svg" className={`logo ${(count >= 3 || activLogo === "love") && "active"}`} alt="Love logo" />
        </div>

        <hr />

        <div className="card">
          <p className="count-paragraph">count is {count}</p>
          <div className="increment-buttons">
            <button onClick={() => (setCount((prev) => prev + 1))}>+1</button>
            <button onClick={() => (setCount((prev) => prev - 1))}>-1</button>
            <button onClick={() => (setCount(0))}>Reset</button>
          </div>
        </div>
      </>}

    </>
  );
}

export default App;
