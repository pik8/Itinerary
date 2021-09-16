import React from "react";
import BrandNavigation from "./components/BrandNavigation.js";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Menu from "./templates/Menu/Menu.js";
import Homepage from "./templates/Homepage/Homepage.js";
import Madeira from "./templates/Madeira.js";
import MenuButton from "./components/MenuButton.js";

export default function App() {
  return (
    <div>
      <Router>
        <Link to="/">
          <BrandNavigation />
        </Link>
        <Link to="/menu">
          <MenuButton />
        </Link>
          <Route exact path="/" component={Homepage}></Route>
        <Switch>
          <Route exact path="/menu" component={Menu}></Route>
          <Route exact path="/madeira" component={Madeira}></Route>
          <Route exact path="/frankfurt" component={Madeira}></Route>
        </Switch>
      </Router>
    </div>
  );
}
