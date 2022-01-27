import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/registration" exact component={Registration}/>

        <Route path="/home" exact component={Home}/>
       
      </Switch>
    </Router>

    </>
  );
}

export default App;
