import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import './style.css'
import Signup from '../components/signup';
import Drop from '../components/backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import base64 from 'base-64';

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
    background:"rgb(f,f,f,f.4)",

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



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
      color:"white",
      background:'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
         color:"white",
         background:'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
         color:"white",
         background:'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        background:'white',
         color:"white"
      },
    },
  },
})(TextField);






export default function LOGIN({history}) {
  const classes = useStyles();

  const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [modal,setModal]=useState(false);
  const [open,setOpen]=useState(false);
  const [message,setMessage]=useState(null);
  const [drop,setDrop]=useState(false);
  const [type,setType]=useState("error");
  const [email,setEmail]=useState(undefined);
  const [Eemail,setEEmail]=useState(false);
  const [password,setPassword]=useState(undefined);
  const [Epassword,setEPassword]=useState(false);
  
function LOGIN(e)
{
    e.preventDefault();
  if(email===undefined || email==="")
  {
      setEEmail(true);
      setEPassword(false);
      setOpen(true);
      setMessage("Enter All Details!");
      setType("error");
      return;
  }

   if(password===undefined || password==="")
  {
      setEPassword(true);
      setEEmail(false);
      setOpen(true);
      setMessage("Enter All Details!");
      setType("error");
      return;
  }


  if(!dS && !ngoS)
  {   
      setEPassword(false);
      setEEmail(false);
      setOpen(true);
      setMessage("Select Login Type!");
      setType("error");
      return;
  }

  
    DONOR_NGO(email,password);
  

}


function DONOR_NGO(email,password)
{
  setDrop(true);
  var url=null;
  if(dS)
  {
     url="http://localhost:8080/api/auth/donor_login";
  }
  else
  {
      url="http://localhost:8080/api/auth/ngo_login";
  }
  
  
   axios.post(url,{email:email,password:password},{headers:{'Content-Type': 'application/json'}})
    .then(res=>{
        setType("success");
        setOpen(true);
        setMessage(res.data.message);
        setEEmail(false);
        setEPassword(false);
        setEmail("");
        setPassword("");
        setDS(false);
        setNGOS(false);
      localStorage.setItem("jwt", res.data.jwt);
       localStorage.setItem("user",JSON.stringify(res.data.donor));
       localStorage.setItem(base64.encode("type"),base64.encode(dS?"donor":"ngo"));

        setTimeout(()=>{
          setDrop(false);
          setOpen(false);
        history.push("/dashboard");
        },2000);
       
       
        
    })
    .catch(error=>{
      console.log(error);
        setDrop(false);
        setType("error");
        setOpen(true);
        setEEmail(false);
        setEPassword(false);
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

  if(localStorage.getItem("jwt")!=null || localStorage.getItem("jwt")!=undefined)
      {
        history.push("/dashboard");
      }
  return (
  	<div className="login">
    <Container component="main" maxWidth="xs" style={{paddingTop:"50px",textAlign:"center"}} >
     
      
      <Container component="main" maxWidth="xs" style={{backgroundColor:"rgba(255,255,255, 0.5)",borderRadius:"10px"}}>
      
      
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
            variant="outlined"
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
            variant="outlined"
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
            <Grid item xs={12} style={{textAlign:"center"}}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12} style={{textAlign:"center",margin:"20px 0px"}}>
              <Link  variant="body2" onClick={()=>{setModal(true)}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
      </Container>

   
    </Container>
       <Signup modal={modal} toggle={()=>{setModal(!modal)}}/>
       <Snackbar anchorOrigin={{ vertical:'top', horizontal:'right' }} open={open}  autoHideDuration={5000} onClose={()=>{setOpen(false)}} >
        <Alert  severity={type}>
          {message}
        </Alert>
      </Snackbar>
      <Drop drop={drop}/>
    </div>
  );
}