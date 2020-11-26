import React from "react";
import {Redirect} from "react-router-dom";
import Stepper from '../components/stepper';
import DetailForm from '../components/DetailForm';
import SET_PASSWORD from '../components/setPassword';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AppBar from '../components/AppBar';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import './style.css'
import PasswordIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';





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
    email:null,
    loading:false,
    mobile:null,
    city:null,
    password:null,
    firstName:null,
    lastName:null,
    Ecity:false,
    Ename:false,
    Ename:false,
    password:null,
    re_password:null,
    Epassword:false,
    Ere_password:false,
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

// componentDidMount=()=>{
//   let query = this.useQuery();
//   const url='http://localhost:8080/api/auth/donor_register';
//       axios.get(url,{headers:{'Content-Type': 'application/json','token':query.get("token")}})
//     .then(res=>{
//         this.setState({email:res.data.email,loading:false});
        
//     })
//     .catch(error=>{
//       if(error.response.status===403)
//       { 
        
//          this.setState({error:error.response.data.message,open:true});
//         setTimeout(()=>{
//          this.setState({access:false,loading:false});
//        },3000);
//       }
//     });
// }

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
        this.setState({Epassword:true,error:"Enter All Details",open:true});
        return; 
      }
      else
      {
        this.setState({Epassword:false});
      }

      if(this.state.re_password===null || this.state.re_password==="")
      {
        this.setState({Ere_password:true,error:"Enter All Details",open:true});
        return;
      }
     
         else
    {

        this.setState({Ere_password:false});
      }

      if(this.state.password!==this.state.re_password)
      {
        this.setState({Ere_password:true,error:"Passwords don't match!",open:true});
        return;
      }

      this.setState({loading:true});
}

  
  handleNext = () => {
     if(this.state.firstName===null || this.state.firstName==="")
      {
        this.setState({Ename:true,error:"Enter All Details",open:true});
        return; 
      }
      else
      {
        this.setState({Ename:false});
      }

      if(this.state.mobile===null || this.state.mobile==="")
      {
        this.setState({Emobile:true,error:"Enter All Details",open:true});
        return;
      }
     
         else
    {

        this.setState({Emobile:false});
      }

      
      if(this.state.city===null || this.state.city==="")
      {
          this.setState({Ecity:true,error:"Enter All Details",open:true});
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

const { classes } = this.props;

	if(query.get("token")===undefined || query.get("token")===null || query.get("token")==="")
		return <Redirect to="/login"/>;
  if(this.state.loading)
    return (<div>loading
        <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={this.state.open}
        onClose={()=>{this.setState({open:false})}}
        message={this.state.error}
      />
      </div>);
  
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
       <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        open={this.state.open}
        onClose={()=>{this.setState({open:false})}}
        message={this.state.error}
      />
 	    </Container>
      </div>
			);
	
	}
  
}

export default DonorRegister;

