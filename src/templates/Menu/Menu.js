import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  return (
    <div id="menu">
      <h1 id="menu-title">Menu</h1>
      <ul className="list-wrapper">
        <li className="list-item">
          <Link to="/madeira">Madeira</Link>
        </li>
        <li className="list-item">
          <Link to="/whale">Frankfurt</Link>
        </li>
      </ul>
    </div>
  );
}
