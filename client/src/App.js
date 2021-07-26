import React from "react";
import './App.css';
import { Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import CreateBreed from './components/CreateBreed/CreateBreed';


function App() {
  return (
    <React.Fragment>
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dog/:id" component={DogDetail} />
          <Route exact path="/createBreed" component={CreateBreed} />
      </React.Fragment>
  );
}

export default App;
