import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,

} from "react-bootstrap";
import { useState } from "react";

function Navigationbar() {
  let navigate = useNavigate();
  const [value, setValue] = useState("ov");

  const overview = () => {
    navigate("/");
    setValue("ov");
    console.log(value);
  };
  const history = () => {
    navigate("/calendar");
    setValue("ca");
    console.log(value);
  };
  const timer = () => {
    navigate("/timer");
    setValue("cr");
    console.log(value);
  };


  return (
    <div>
      <Navbar bg="light" variant="light" fixed="bottom">
        {/* style={ {backgroundColor: '#4f4f4f'}} */}
        <Container>
          <Button
            onClick={overview}
            as={NavLink}
            to={"/"}
            style={({ isActive }) => (isActive ? {backgroundColor: '#4f4f4f'} : {backgroundColor: "#6c757d"})}
            end
          >
            Overview
          </Button>
          <Button
            onClick={timer}
            as={NavLink}
            to={"/timer"}
            style={({ isActive }) => (isActive ? {backgroundColor: '#4f4f4f'} : {backgroundColor: "#6c757d"})}
          >
            Create
          </Button>
          <Button
            onClick={history}
            as={NavLink}
            to={"/calendar"}
            style={({ isActive }) => (isActive ? {backgroundColor: '#4f4f4f'} : {backgroundColor: "#6c757d"})}
          
          >
            Calendar
          </Button>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
