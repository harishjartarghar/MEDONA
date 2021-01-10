import React,{useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide,Grid,TextField} from '@material-ui/core';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import {DONOR_FORGOT_INVITE,NGO_FORGOT_INVITE} from '../redux/actions/authActions';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect ,useSelector, useDispatch } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Signup({modal,toggle,...props}) {
  const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [Email,setEmail]=useState("");
  const [error,setError]=useState(false);





function submit()
{
  if(Email===""){setError(true);props.Alert("Email is required!","error");return;}
 if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)) {setError(true);props.Alert("Enter Valid Email!","error");return;}

  if(!dS && !ngoS){props.Alert("Select Type","error");return;}


  if(dS)
    {props.Donor_Invite(Email);}
  else
    {props.Ngo_Invite(Email);}
setEmail("");
setDS(false);
setNGOS(false);
 toggle();
  

}
  
  function donor_click(){
    setDS(!dS);
    setNGOS(false);
  
    setError(false)
  } 


  function ngo_click(){
    setNGOS(!ngoS);
    setDS(false);
    setError(false)
  } 





  return (
        <Dialog fullWidth={true} 
        onClose={toggle}
        maxWidth="xs" TransitionComponent={Transition}
        keepMounted open={modal}  aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="form-dialog-title" style={{textAlign:"center"}}>Forgot Password</DialogTitle>
        <DialogContent style={{textAlign:"center"}}>
        
         <Grid container style={{textAlign:"center",marginTop:"30px",}}>
            <Grid item xs={6} >
                
       <img onClick={()=>{donor_click()}} alt="donor" src={dS?donor_check:donor} style={{maxWidth:"100px",maxHeight:"100px"}}/>
                
            </Grid>
            <Grid item xs={6} style={{textAlign:"center"}}>
                 <img onClick={()=>ngo_click()} alt="ngo" src={ngoS?ngo_check:ngo} style={{maxWidth:"100px",maxHeight:"100px"}}/>

            </Grid>
          </Grid>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="Email"
            label="Email Address"
            name="Email"
            
            autoFocus
            size="small"
            helperText={error?"Email is not valid!":null}
            value={Email}
          
          />
         
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>{setEmail("");setError(false);setDS(false);setNGOS(false);toggle()}} color="primary">
            Cancel
          </Button>
          <Button  color="primary" onClick={submit}>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}





const mapDispatchToProps=(dispatch)=>{
return{
    Donor_Invite:(email)=>{dispatch(DONOR_FORGOT_INVITE(email))},
    Ngo_Invite:(email,mobile)=>{dispatch(NGO_FORGOT_INVITE(email))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(Signup);

