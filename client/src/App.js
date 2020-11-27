import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from './layouts/login';
import DonorRegister from './layouts/DonorRegister';
import NgoRegister from './layouts/NgoRegister';
import Dashboard from './layouts/dashboard';

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
    <Switch>
      <Route exact path="/login" render={(props)=><LOGIN history={props.history}/>} />
      <Route exact path="/donor" component={DonorRegister}/>
      <Route exact path="/ngo" component={NgoRegister}/>
      <Route exact path="/dashboard" component={Dashboard}/>
    
      <Redirect to="/login"/>
    </Switch>
  </Router>
  );
}

export default App;
