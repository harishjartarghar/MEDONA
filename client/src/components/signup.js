import React,{useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Slide,Grid,TextField} from '@material-ui/core';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import {DONOR_INVITE,NGO_INVITE} from '../redux/actions/authActions';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect ,useSelector, useDispatch } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Signup(props) {
  const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [Email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
  const [error,setError]=useState(false);
  const [Merror,setMError]=useState(false);
  const { signupModal } = useSelector(state => state.snackbar);
  const dispatch = useDispatch()



function submit()
{
  if(Email===""){setError(true);setMError(false);props.Alert("Email is required!","error");return;}

  if(ngoS){if(mobile===""){setMError(true);props.Alert("Mobile No is required!","error");return;}}

  if(!dS && !ngoS){props.Alert("Select Registration Type","error");return;}


  if(dS)
    {props.Donor_Invite(Email);}
  else
    {props.Ngo_Invite(Email,mobile);}
 
  

}
  
  function donor_click(){
    setDS(!dS);
    setNGOS(false);
    setMError(false);
    setError(false)
  } 


  function ngo_click(){
    setNGOS(!ngoS);
    setDS(false);
     setMError(false);
    setError(false)
  } 





  return (
        <Dialog fullWidth={true} 
        onClose={() => dispatch({ type: 'TOGGLE_MODAL' })}
        maxWidth="xs" TransitionComponent={Transition}
        keepMounted open={signupModal}  aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="form-dialog-title" style={{textAlign:"center"}}>Register As :</DialogTitle>
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
            helperText={error?"Email is required!":null}
            value={Email}
          
          />
         {ngoS? <TextField
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     required
                     error={Merror}
                     onChange={(e)=>{setMobile(e.target.value)}}
                     id="mobile"
                     label="Mobile No"
                     name="mobile"
                     size="small"
                     helperText={Merror?"Mobile is required!":null}
                     value={mobile}
                   
                   />:null}
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>{setEmail("");setError(false);setDS(false);setNGOS(false);dispatch({ type: 'TOGGLE_MODAL' })}} color="primary">
            Cancel
          </Button>
          <Button  color="primary" onClick={submit}>
            signup
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}





const mapDispatchToProps=(dispatch)=>{
return{
    Donor_Invite:(email)=>{dispatch(DONOR_INVITE(email))},
    Ngo_Invite:(email,mobile)=>{dispatch(NGO_INVITE(email,mobile))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(Signup);

