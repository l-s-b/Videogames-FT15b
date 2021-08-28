import React from "react";
import "./css/App.css";
import "./css/NavBar.css";
import "./css/Footer.css";
import NavBar from "./components/NavBar";
import { Route } from "react-router";
import LP from "./components/LP";
import Main from "./components/Main";
import Footer from "./components/Footer";
import VGDetail from "./components/VGDetail";

function App() {

  return (
    <div className='App'>

      <Route exact path='/' component={ LP } />
      <Route path='/main' component={NavBar} />
      <Route exact path='/main' component={Main} />
      <Route path='/main/videogame/:id' component={VGDetail} />
      <Footer />
    </div>
  );
}

export default App;
