import React,{useState} from 'react';
import {Button,TextField,Link,Grid,Typography,Snackbar,Paper,Container} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import './style.css'
import Graph from '../components/graph';
import { useDispatch,useSelector } from "react-redux";
import {GET_DATA} from '../redux/actions/donationAction';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect  } from 'react-redux';



class STATISTICS extends React.Component {

 componentDidMount=()=>{this.props.Get_Data()}
 render(){
  return (
  	<Container style={{padding:"0 10px"}}>
  	<Grid container spacing={2} style={{margin:"auto"}}>
    <Grid item xs={12} md={6} style={{margin:"auto",width:"100px",heigth:"100px"}}>
    <Graph data1={this.props.donation.data1} label1={this.props.donation.label1} title="Medicine"/>
    </Grid>
    <Grid item xs={12} md={6} style={{margin:"auto"}}>
    <Graph data1={this.props.donation.data2} label1={this.props.donation.label2} title="Total Medicine (Category Wise) "/>
    </Grid>
    <Grid item xs={12}  md={6} style={{margin:"auto"}}>
    <Graph data1={this.props.donation.data3} label1={this.props.donation.label3} title="Medicine Donated (Category Wise)"/>
    </Grid>
    <Grid item xs={12} md={6} style={{margin:"auto"}}>
    <Graph data1={this.props.donation.data4} label1={this.props.donation.label4} title="No of Users"/>
    </Grid>
    
  
    </Grid>
    	
    </Container>
  );
}
}


const mapDispatchToProps=(dispatch)=>{
return{
    Get_Data:()=>{dispatch(GET_DATA())}
}
}

const mapStatetoProps=(state)=>{
    return{
      donation:state.donation,
      auth:state.auth
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(STATISTICS);