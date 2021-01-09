
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DonorAccount from '../components/Donoraccount';
import NgoAccount from '../components/NgoAccount';
import {Container}from '@material-ui/core';
import base64 from 'base-64';



class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      

        
    };
   
  }

 
  
 

  render() {
   

   

    return (
      <div>
         {base64.decode(localStorage.getItem(base64.encode("type")))==="donor"?
                  <DonorAccount/>:
                  <NgoAccount/>}
      </div>
    );
  }
}

export default Account;
