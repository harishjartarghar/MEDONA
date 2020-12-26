
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DonorAccount from '../components/Donoraccount';
import {Container}from '@material-ui/core';



class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      

        
    };
   
  }

 
  
 

  render() {
   

   

    return (
      <div>
         <DonorAccount/>
      </div>
    );
  }
}

export default Account;
