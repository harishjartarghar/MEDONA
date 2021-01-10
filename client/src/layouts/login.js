import React,{useState} from 'react';
import {Button,TextField,Link,Grid,Typography,Snackbar,Paper,Container} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import './style.css'
import Signup from '../components/signup';
import Forgot from '../components/forgot_password';
import { useDispatch,useSelector } from "react-redux";
import {DONOR_LOGIN,NGO_LOGIN} from '../redux/actions/authActions';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect  } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: "50px auto",
    backgroundColor: theme.palette.secondary.main,
    textAlign:"center"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },
   card: {
    
    height:"50%",
    textAlign:"center",

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

}));









function LOGIN(props) {

  const dispatch = useDispatch()
  const classes = useStyles();
  const { signupModal } = useSelector(state => state.snackbar);


  const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [email,setEmail]=useState("");
  const [Eemail,setEEmail]=useState(false);
  const [password,setPassword]=useState("");
  const [Epassword,setEPassword]=useState(false);
  const [modal,setModal]=useState(false);
 
  
function LOGIN(e)
{
  e.preventDefault();

  if(email===""){setEEmail(true);setEPassword(false);props.Alert("Email is required!","error");return;}

  if(password===""){setEPassword(true);setEEmail(false);props.Alert("Password is required!","error");return;}

  if(!dS && !ngoS){setEPassword(false);setEEmail(false);props.Alert("Select Login Type","error");return;}

  if(dS)
    {props.Donor_Login(email,password,props);}
  else
    {props.Ngo_Login(email,password,props);}
}





  function donor_click(){
  	setDS(!dS);
  	setNGOS(false);
  } 

  function ngo_click(){
  	setNGOS(!ngoS);
  	setDS(false);
  } 

  if(localStorage.getItem("jwt")!=null || localStorage.getItem("jwt")!=undefined)
      {
        props.history.push("/dashboard");
      }
  return (
  	<div className="login">
    <Container component="main" maxWidth="xs" style={{paddingTop:"50px",textAlign:"center"}} >
     
      
      <Container component="main" maxWidth="xs" style={{backgroundColor:"white",border:"5px solid black",borderRadius:"10px"}}>
      
      
      <div className={classes.paper}>
       
        <Typography style={{paddingTop:"10px"}} component="h1" variant="h5">
          Sign in
        </Typography>
        <Grid container style={{textAlign:"center",marginTop:"30px"}}>
            <Grid item xs={6} >
             		
       <img alt="donor" onClick={()=>{donor_click()}} src={dS?donor_check:donor} style={{maxWidth:"100px",maxHeight:"100px"}}/>
        				
            </Grid>
            <Grid item xs={6} style={{textAlign:"center"}}>
              	 <img  alt="ngo" onClick={()=>ngo_click()} src={ngoS?ngo_check:ngo} style={{maxWidth:"100px",maxHeight:"100px"}}/>

            </Grid>
          </Grid>
       
       
        <form className={classes.form} noValidate>
    
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Eemail}
            helperText={Eemail?"Email is required!":null}
            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{setPassword(e.target.value)}}
            error={Epassword}
            helperText={Epassword?"Password is required!":null}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            InputLabelProps={{
            shrink: true,
          }}
          />
          <Button
            type="submit"
            onClick={LOGIN}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
          <Grid item xs={12} style={{textAlign:"center",margin:"10px 0px"}}>
              <Link style={{cursor: "pointer"}}  variant="body2" onClick={() => setModal(true)}>
                {"Forgot Password?"}
              </Link>
            </Grid>
            <Grid item xs={12} style={{textAlign:"center",marginBottom:"20px"}}>
              <Link style={{cursor: "pointer"}}  variant="body2" onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
      </Container>

   
    </Container>
       <Signup/>
       <Forgot modal={modal} toggle={()=>{setModal(!modal)}}/>
    </div>
  );
}


const mapDispatchToProps=(dispatch)=>{
return{
    Donor_Login:(email,password,props)=>{dispatch(DONOR_LOGIN(email,password,"donor",props))},
    Ngo_Login:(email,password,props)=>{dispatch(NGO_LOGIN(email,password,"ngo",props))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(LOGIN);