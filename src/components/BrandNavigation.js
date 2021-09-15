import React from "react";
import { Redirect, Route } from "react-router-dom";
import Logo from "../assets/mountain.svg";

export default function BrandNavigation() {
  return (
    <div>
      <img src={Logo} alt="adventure-icon" className="nav-icon-menu" />
      <Route exact path="/">
        <Redirect to="/" />
      </Route>
    </div>
  );
}
