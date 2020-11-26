import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import donor from '../assets/donor.jpeg'
import donor_check from '../assets/donor_check.jpeg'
import ngo from '../assets/ngo.jpeg'
import ngo_check from '../assets/ngo_check.jpeg'
import './style.css'
import Signup from '../components/signup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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





export default function LOGIN() {
  const classes = useStyles();

  const [dS,setDS]=useState(false);
  const [ngoS,setNGOS]=useState(false);
  const [modal,setModal]=useState(false);
  
  function donor_click(){
  	setDS(!dS);
  	setNGOS(false);
  } 

  function ngo_click(){
  	setNGOS(!ngoS);
  	setDS(false);
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
             		
       <img onClick={()=>{donor_click()}} src={dS?donor_check:donor} style={{maxWidth:"100px",maxHeight:"100px"}}/>
        				
            </Grid>
            <Grid item xs={6} style={{textAlign:"center"}}>
              	 <img onClick={()=>ngo_click()} src={ngoS?ngo_check:ngo} style={{maxWidth:"100px",maxHeight:"100px"}}/>

            </Grid>
          </Grid>
       
       
        <form className={classes.form} noValidate>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
    </div>
  );
}