import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from './layouts/login';
import DonorRegister from './layouts/DonorRegister';

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
    <Switch>
      <Route exact path="/login" component={LOGIN}/>
      <Route exact path="/verify/donor" component={DonorRegister}/>
      <Redirect to="/login"/>
    </Switch>
  </Router>
  );
}

export default App;
