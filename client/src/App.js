import './App.css';

import Header from './Header/Header';
import Dashboard from './Dashboard/Dashboard';
import SignIn from './SignIn/SignIn';
import TestSignIn from './SignIn/TestSignIn';
import UserHomePage from './UserHomePage/UserHomePage';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/signin' render={(props) => <TestSignIn {...props}/>} />
        <Route path='/dashboard/' render={(props) => <UserHomePage {...props}/>} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
