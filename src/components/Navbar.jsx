import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const overview = () => {
    navigate("/");
  };
  const history = () => {
    navigate("/history");
  };
  const timer = () => {
    navigate("/timer");
  };

  return (
    <div>
      <button onClick={overview}>home</button>
      <button onClick={timer}>cr8</button>
      <button onClick={history}>past</button>
    </div>
  );
}

export default Navbar;
