import './App.css';
import Dashboard from './Dashboard/Dashboard';
import UserHomePage from './UserHomePage/UserHomePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/dashboard' render={(props) => <UserHomePage {...props}/>} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
