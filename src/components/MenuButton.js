import React from "react";
import { Redirect, Route } from "react-router-dom";
import Direction from "../assets/direction.svg";

export default function MenuButton() {
  return (
    <div>
      <img src={Direction} alt="menu-icon" className="menu-icon" />
      <Route exact path="/menu">
        <Redirect to="/menu" />
      </Route>
    </div>
  );
}
