import React from "react";
import {Redirect} from "react-router-dom";
import Stepper from '../components/stepper';
import DetailForm from '../components/DetailForm';
import SET_PASSWORD from '../components/setPassword';
import {Button,Container} from '@material-ui/core';
import AppBar from '../components/AppBar';
import './style.css'
import PasswordIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import { connect  } from 'react-redux';
import Drop from '../components/backdrop';
import axios from 'axios';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import base64 from 'base-64';
import { useSelector, useDispatch } from "react-redux";



class DonorRegister extends React.Component {

constructor(props)
{	
	super(props);
	this.state={
		activeStep:1,
    steps:['FILL BASIC DETAILS', 'SET PASSWORD'],
    open:false,
    vertical: 'top',
    horizontal: 'center',
    error:null,
    access:true,
    email:"",
    loading:true,
    mobile:"",
    city:"",
    password:"",
    firstName:"",
    lastName:"",
    Ecity:false,
    Ename:false,
    re_password:"",
    Epassword:false,
    Ere_password:false,
    drop:false,
    icons:{
    1: <EmailIcon />,
    2: <InfoIcon />,
    3: <PasswordIcon />,
  }

	}
}



handleInputChange=(e)=> {

    this.setState({
        [e.target.id]: e.target.value
    });
}

componentDidMount=()=>{
  let query = this.useQuery();
  const url='/api/auth/donor_register';
      axios.get(url,{headers:{'Content-Type': 'application/json','token':query.get("token")}})
    .then(res=>{
      if(res.data.type!=="donor")
        this.props.history.push("/login");
      else
        this.setState({email:res.data.email,loading:false});
        
    })
    .catch(error=>{
      if(error.response.status===403)
      { 
        this.props.Alert(error.response.data.message,"error")
        setTimeout(()=>{
         this.props.history.push("/login");
       },3000);
      }
    });
}

useQuery =()=> {return new URLSearchParams(this.props.location.search);}

getStepContent=(stepIndex)=> {
  switch (stepIndex) {
    case 0:
      return 'EMAIL VERIFIED';
    case 1:
      return <DetailForm handleInputChange={this.handleInputChange} data={this.state}/>;
    case 2:
      return <SET_PASSWORD handleInputChange={this.handleInputChange} data={this.state}/>;
    default:
      return 'Unknown stepIndex';
  }
}



onSubmit=(e)=>{
 if(this.state.password===null || this.state.password==="")
      {
  
        this.props.Alert("Enter All Details","error")
        return; 
      }
      else
      {
        this.setState({Epassword:false});
      }

       if(this.state.password.length<=6)
      {
  
        this.props.Alert("Password Length should be atleast 7 characters!","error")
        return; 
      }
      
      if(this.state.re_password===null || this.state.re_password==="")
      {
        this.props.Alert("Enter All Details","error")
        
        return;
      }
     
         else
    {

        this.setState({Ere_password:false});
      }

      if(this.state.password!==this.state.re_password)
      {
        this.props.Alert("Passwords don't match!","error")
        return;
      }

      this.REGISTER();
}


REGISTER=()=>{
  let query = this.useQuery();
  const url='/api/auth/donor_register'
  const data={
    email:this.state.email,
    name:this.state.firstName+" "+this.state.lastName,
    mobile:this.state.mobile,
    city:this.state.city,
    password:this.state.password
  }
   axios.post(url,data,{headers:{'Content-Type': 'application/json','token':query.get("token")}})
    .then(res=>{
        this.props.Alert("Registration Complete!","success")
       localStorage.setItem("jwt", res.data.jwt);
       localStorage.setItem("user",JSON.stringify(res.data.donor));
       localStorage.setItem(base64.encode("type"),base64.encode("donor"));
       this.props.login(res.data.jwt,res.data.donor);
       

        setTimeout(()=>{
            this.setState({drop:false});
          this.props.history.push("/dashboard");
        },2000);
        
    })
    .catch(error=>{
      console.log(error);
         this.setState({drop:false,error:"Something went wrong!",open:true});
    });
}

  
  handleNext = () => {
     if(this.state.firstName===null || this.state.firstName==="")
      {
        
        this.props.Alert("Enter All Details","error")
        return; 
      }
      else
      {
        this.setState({Ename:false});
      }

      if(this.state.mobile===null || this.state.mobile==="")
      {
        this.props.Alert("Enter All Details","error")
        
        return;
      }
     
         else
    {

        this.setState({Emobile:false});
      }

      if(isNaN(this.state.mobile))
      {
        this.props.Alert("Enter Valid Mobile No","error")   
        return;
      }

      if(this.state.mobile.length!==10)
      {
        this.props.Alert("Enter Valid Mobile No","error")   
        return;
      }
     
    

      
      if(this.state.city===null || this.state.city==="")
      {
        this.props.Alert("Enter All Details","error")
          
          return;
      }
      else
      {
        this.setState({Ecity:false});
      }
      

    this.setState({activeStep:this.state.activeStep + 1});
  };

  handleBack = () => {
  	this.setState({activeStep:this.state.activeStep===1?this.state.activeStep:this.state.activeStep - 1});
  };

  handleReset = () => {
    this.setState({activeStep:1});
  };

render(){
	let query = this.useQuery();


	if(query.get("token")===undefined || query.get("token")===null || query.get("token")==="")
		return <Redirect to="/login"/>;
  if(this.state.loading)
    return (<div><Drop drop={true}/></div>);
  
  if(!this.state.access)
    return <Redirect to="/login"/>;
	
	return (
    <div className="donor" >
    <AppBar/>
 		<Container component="main" maxWidth="md">
   
 		<Stepper activeStep={this.state.activeStep} steps={this.state.steps} icons={this.state.icons}/>
 	  {this.getStepContent(this.state.activeStep)}
 	<div style={{marginTop:"40px"}}>
        <div style={{textAlign:"center"}}>
            
            <div>
              {this.state.activeStep===1?null:<Button
                              disabled={this.state.activeStep === 0}
                              onClick={this.handleBack}
                              
                            >Back
              </Button>}
                
              {this.state.activeStep===1?
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                              Next
                </Button>
                :
                  <Button variant="contained" color="primary" onClick={this.onSubmit} >
                             Submit
                   </Button>


                }
            </div>
          </div>
      </div>
      </Container>
      </div>
			);
	
	}
  
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
    login:(token,data)=>{dispatch({type:'LOGIN_SUCCESS',token:token,user:data});}
}
}

export default connect(null,mapDispatchToProps)(DonorRegister);


