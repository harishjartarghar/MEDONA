import React, { Component } from 'react';

import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LOGIN from './layouts/login';
import DonorRegister from './layouts/DonorRegister';
import DonorForgot from './layouts/Donor_Forgot';
import NgoRegister from './layouts/NgoRegister';
import NgoForgot from './layouts/Ngo_Forgot';
import Home from './layouts/home';
import stats from './layouts/statistics';
import Chat from './layouts/chat';
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
    
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={LOGIN} />
      <Route exact path="/donor" component={DonorRegister}/>
      <Route exact path="/forgotpassword/donor" component={DonorForgot}/>
      <Route exact path="/forgotpassword/ngo" component={NgoForgot}/>
      <Route exact path="/ngo" component={NgoRegister}/>
      <Route exact path="/statistics" component={stats}/>
      <Route exact path="/assistance" component={Chat}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Redirect to="/"/>
    </Switch>
    <SnackBar/>
    <Drop/>
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

