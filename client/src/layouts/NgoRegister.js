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
    email:null,
    loading:true,
    drop:false,
    mobile:null,
    Amobile:null,
    street:null,
    district:null,
    state:null,
    pincode:null,
    city:null,
    password:null,
    ngoname:null,
    Ecity:false,
    Engoname:false,
    Ename:false,
    re_password:null,
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
  const url='http://localhost:8080/api/auth/ngo_register';
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

      this.setState({drop:true});
      this.REGISTER();
}

REGISTER=()=>{
  let query = this.useQuery();
  const url='http://localhost:8080/api/auth/ngo_register';
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
       
       this.setState({open:true,error:"Registration Complete!"});
       localStorage.setItem("jwt", res.data.jwt);
       localStorage.setItem("ngo",JSON.stringify(res.data.ngo));
       localStorage.setItem("type","ngo");

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
        this.setState({Engoname:true,error:"Enter All Details",open:true});
        return; 
      }
      else
      {
        this.setState({Engoname:false});
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

      this.handleNext();
}


addressDetails=()=>{

   if(this.state.street===null || this.state.street==="")
      {
        this.setState({Estreet:true,error:"Enter All Details",open:true});
        return; 
      }
      else
      {
        this.setState({Estreet:false});
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

       if(this.state.district===null || this.state.district==="")
      {
        this.setState({Edistrict:true,error:"Enter All Details",open:true});
        return;
      }
         else
    {

        this.setState({Edistrict:false});
      }

       if(this.state.state===null || this.state.state==="")
      {
        this.setState({Estate:true,error:"Enter All Details",open:true});
        return;
      }
         else
    {

        this.setState({Estate:false});
      }

        if(this.state.pincode===null || this.state.pincode==="")
      {
        this.setState({Epincode:true,error:"Enter All Details",open:true});
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

export default NGORegister;

