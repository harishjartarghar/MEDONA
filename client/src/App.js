import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from './layouts/login';

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
    <Switch>
      <Route exact path="/login" component={LOGIN}/>
      <Redirect to="/login"/>
    </Switch>
  </Router>
  );
}

export default App;
