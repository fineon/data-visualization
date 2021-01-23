import './App.css';

import Header from './Header/Header';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router";


function App() {
  return (
    <>
      <Header/>
      <Dashboard/>
    </>
  );
}

export default App;
