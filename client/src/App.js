import React, { Component } from 'react';

import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from './layouts/login';
import DonorRegister from './layouts/DonorRegister';
import NgoRegister from './layouts/NgoRegister';
import Dashboard from './layouts/dashboard';
import { connect } from 'react-redux';
import { CHECK_AUTH } from './redux/actions/authActions';
import SnackBar from './components/snackbar';
import Drop from './components/backdrop';



const hist = createBrowserHistory();

class App extends Component {
  render(){
  this.props.Check_Auth();
  return (
    <div>
    <SnackBar/>
    <Drop/>
    <Switch>
      <Route exact path="/login" component={LOGIN} />
      <Route exact path="/donor" component={DonorRegister}/>
      <Route exact path="/ngo" component={NgoRegister}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Redirect to="/login"/>
    </Switch>
  </div>
  );
}
}

const mapDispatchToProps=(dispatch)=>{
  return {
    Check_Auth:()=>{dispatch(CHECK_AUTH())}
  }
}

export default connect(null,mapDispatchToProps)(App);

