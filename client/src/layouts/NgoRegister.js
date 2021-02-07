import React from "react";
import {Redirect} from "react-router-dom";
import Stepper from '../components/stepper';
import NGODetailForm from '../components/NGODetailForm';
import SET_PASSWORD from '../components/setPassword';
import AddressForm from '../components/AddressForm';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AppBar from '../components/AppBar';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import './style.css'
import PasswordIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import AddressIcon from '@material-ui/icons/Business'
import Drop from '../components/backdrop';
import base64 from 'base-64';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect  } from 'react-redux';

class NGORegister extends React.Component {

constructor(props)
{ 
  super(props);
  this.state={
    activeStep:1,
    steps:['FILL NGO DETAILS','ADDRESS', 'SET PASSWORD'],
    open:false,
    vertical: 'top',
    horizontal: 'center',
    error:null,
    access:true,
    email:"",
    loading:true,
    drop:false,
    mobile:"",
    Amobile:"",
    street:"",
    district:"",
    state:"",
    pincode:"",
    city:"",
    password:"",
    ngoname:"",
    Ecity:false,
    Engoname:false,
    Ename:false,
    re_password:"",
    Epassword:false,
    Ere_password:false,
    Estreet:false,
    Epincode:false,
    Estate:false,
    Edistrict:false,

      icons:{
    1: <EmailIcon />,
    2: <InfoIcon />,
    3: <AddressIcon/>,
    4:<PasswordIcon />
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
  const url='/api/auth/ngo_register';
      axios.get(url,{headers:{'Content-Type': 'application/json','token':query.get("token")}})
    .then(res=>{
        if(res.data.type!=="ngo")
          this.props.history.push("/login");
        else
          this.setState({email:res.data.email,mobile:res.data.mobile,loading:false});
        
    })
    .catch(error=>{
      if(error.response.status===403)
      { 
        
         this.setState({error:error.response.data.message,open:true});
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
      return <NGODetailForm handleInputChange={this.handleInputChange} data={this.state}/>;
    case 2:
    return <AddressForm handleInputChange={this.handleInputChange} data={this.state}/>;
    case 3:
      return <SET_PASSWORD handleInputChange={this.handleInputChange} data={this.state}/>;
    default:
      return 'Unknown stepIndex';
  }
}


getStepButton=(stepIndex)=> {
  switch (stepIndex) {
    case 0:
      return 'EMAIL VERIFIED';
    case 1:
      return (<Button variant="contained" color="primary" onClick={this.Details}>
                                    Next
                      </Button>);
    case 2:
    return (
     <Button variant="contained" color="primary" onClick={this.addressDetails} >
                             Next
                   </Button>
    );
    case 3:
      return (
         <Button variant="contained" color="primary" onClick={this.onSubmit} >
                             Submit
                   </Button>
        );
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
        this.props.Alert("Enter All Details","error");
        return;
      }

      this.setState({drop:true});
      this.REGISTER();
}

REGISTER=()=>{
  let query = this.useQuery();
  const url='/api/auth/ngo_register';
  const data={
    email:this.state.email,
    name:this.state.ngoname,
    mobile:this.state.mobile,
    Amobile:this.state.Amobile,
    address:{
      street:this.state.street,
      city:this.state.city,
      district:this.state.district,
      state:this.state.state,
      pincode:this.state.pincode
    },
    password:this.state.password
  }
   axios.post(url,data,{headers:{'Content-Type': 'application/json','token':query.get("token")}})
    .then(res=>{
       
       this.props.Alert("Registration Complete!","success")
       localStorage.setItem("jwt", res.data.jwt);
       localStorage.setItem("user",JSON.stringify({id:res.data.ngo.id,email:data.email,alternate:data.Amobile,mobile:data.mobile,name:data.name}));
       
       localStorage.setItem(base64.encode("type"),base64.encode("ngo"));
      
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
  
Details=()=>{
   if(this.state.ngoname===null || this.state.ngoname==="")
      {
        this.props.Alert("Enter All Details","error");
        return; 
      }
      else
      {
        this.setState({Engoname:false});
      }

      if(this.state.mobile===null || this.state.mobile==="")
      {
        this.props.Alert("Enter All Details","error");
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
     
       if(isNaN(this.state.Amobile) && this.state.Amobile!=="")
      {
        this.props.Alert("Enter Valid Alt. Mobile No","error")   
        return;
      }
    

      this.handleNext();
}


addressDetails=()=>{

   if(this.state.street===null || this.state.street==="")
      {
         this.props.Alert("Enter All Details","error");
        return; 
      }
      else
      {
        this.setState({Estreet:false});
      }

      if(this.state.city===null || this.state.city==="")
      {
         this.props.Alert("Enter All Details","error");
        return;
      }
         else
    {

        this.setState({Ecity:false});
      }

       if(this.state.district===null || this.state.district==="")
      {
         this.props.Alert("Enter All Details","error");
        return;
      }
         else
    {

        this.setState({Edistrict:false});
      }

       if(this.state.state===null || this.state.state==="")
      {
         this.props.Alert("Enter All Details","error");
        return;
      }
         else
    {

        this.setState({Estate:false});
      }

        if(this.state.pincode===null || this.state.pincode==="")
      {
         this.props.Alert("Enter All Details","error");
        return;
      }
         else
    {

        this.setState({Epincode:false});
      }

      this.handleNext();

}

  handleNext = () => {
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
                
              {this.getStepButton(this.state.activeStep)}
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
      <Drop drop={this.state.drop}/>
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

export default connect(null,mapDispatchToProps)(NGORegister);


