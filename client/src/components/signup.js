import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Drop from './backdrop';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Signup({modal,toggle}) {
 const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [open,setOpen]=useState(false);
  const [Email,setEmail]=useState(null);
  const [mobile,setMobile]=useState(null);
  const [error,setError]=useState(false);
  const [Merror,setMError]=useState(false);
  const [message,setMessage]=useState(null);
  const [drop,setDrop]=useState(false);
  const [type,setType]=useState("success");


function submit()
{
  if(!Email || Email==="")
  {
    setError(true);
    setMError(false);
    setType("error");
    setMessage("Email is required!")
    return;
  }

  if(ngoS)
  {
      if(!mobile || mobile==="")
      {
        setMError(true);
        setType("error");
        setError(false);
        setMessage("Mobile is required");
        return;
      }
  }

  if(!dS && !ngoS)
  {
      setOpen(true);
      setType("error");
      setError(false);
      setMessage("Select Type");
      return;
  }

  setDrop(true);
  var url=null;
  if(dS)
  {
    url='http://localhost:8080/api/auth/donor_email';
  }
  else
  {
    url='http://localhost:8080/api/auth/ngo_email';
  }
 
      axios.post(url,{email:Email,mobile:mobile},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
        setType("success");
        setOpen(true);
        setMessage(res.data.message);
        setError(false);
        setMError(false);
        setEmail("");
        setMobile("");
        setDS(false);
        setNGOS(false);


        setTimeout(()=>{
          setDrop(false);
             toggle();
        },3000);
       
        
    })
    .catch(error=>{
        setDrop(false);
        setType("error");
        setOpen(true);
        setMError(false);
        setError(false);
        setMessage(error.response.data.message);
    });

}
  
  function donor_click(){
    setDS(!dS);
    setNGOS(false);
  } 

  function ngo_click(){
    setNGOS(!ngoS);
    setDS(false);
  } 

 const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  return (
   
        <Dialog fullWidth={true} 
        onClose={toggle}
        maxWidth="xs" TransitionComponent={Transition}
        keepMounted open={modal}  aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="form-dialog-title" style={{textAlign:"center"}}>Register As :</DialogTitle>
        <DialogContent style={{textAlign:"center"}}>
        
         <Grid container style={{textAlign:"center",marginTop:"30px",}}>
            <Grid item xs={6} >
                
       <img onClick={()=>{donor_click()}} src={dS?donor_check:donor} style={{maxWidth:"100px",maxHeight:"100px"}}/>
                
            </Grid>
            <Grid item xs={6} style={{textAlign:"center"}}>
                 <img onClick={()=>ngo_click()} src={ngoS?ngo_check:ngo} style={{maxWidth:"100px",maxHeight:"100px"}}/>

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
            helperText={error?message:null}
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
                     helperText={Merror?message:null}
                     value={mobile}
                   
                   />:null}

        
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>{setEmail("");setError(false);setDS(false);setNGOS(false);toggle();}} color="primary">
            Cancel
          </Button>
          <Button  color="primary" onClick={submit}>
            signup
          </Button>
        </DialogActions>
         <Snackbar anchorOrigin={{ vertical:'top', horizontal:'right' }} open={open}  autoHideDuration={5000} onClose={handleClose} >
        <Alert  severity={type}>
          {message}
        </Alert>
      </Snackbar>
      <Drop drop={drop}/>
      </Dialog>
    
  );
}
