import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography,Slide} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {NGO_FORGOT_PASSWORD} from '../redux/actions/authActions';
;

const useStyles = makeStyles((theme) => ({
	root:{
		background:'rgba(0,0,0,0.8)',
		width:"100%",
		height:"100%",
    padding:"30px"

	},
  appBar: {
    position: 'relative',

  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign:"center"
  },
  paper: {
    marginTop: 'auto',
    marginDown: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"honeydew",


  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),

  },
    container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"20px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#eee'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },

  tool:{
  	backgroundColor:'#eee',
  	border:'2px solid rgb(138,35,135)'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide s direction="up" ref={ref} {...props} />;
});

function Ngo_Forgot(props) {
  const classes = useStyles();
  const [password,setPassword]=useState("");
  const [Epassword,setEPassword]=useState(false);
  const [Rpassword,setRPassword]=useState("");
  const [ERpassword,setERPassword]=useState(false);





 useEffect(()=>{

 	 let query =new URLSearchParams(props.location.search);

 	 if(!query.get("token")){props.history.push("/login")}
   
  },[]);


function SUBMIT()
{
	let query =new URLSearchParams(props.location.search);

	if(password==="" || password===undefined)
	{	
		setEPassword(true);
		setERPassword(false);

		props.Alert("Enter All Details!","error");
		return;
	}

	if(password.length<=6)
	{	
		setEPassword(true);
		setERPassword(false);
		props.Alert("Password Length should be atleast 7 characters!","error");
		return;
	}

	if(Rpassword==="" || Rpassword===undefined)
	{	
		setERPassword(true);
		setEPassword(false);
		props.Alert("Enter All Details!","error");
		return;
	}

	if(password!==Rpassword)
	{
		setERPassword(true);
		setEPassword(false);
		props.Alert("Passwords do not match!","error");
		return;
	}

	props.Update(password,query.get("token"),props);

}



  return (
    <Container   maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog    open={true}   TransitionComponent={Transition}>
        
       
        <div className={classes.root}>
        <Toolbar className={classes.tool}>
        
            <Typography variant="h6" className={classes.title}>
          			RESET PASSWORD
            </Typography>
           	
          </Toolbar>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            
            
            <Grid item xs={12} style={{textAlign:"center"}}>
               <TextField
                autoComplete="name"
                value={password}
                name="name"
                variant="outlined"
                required
                type="password"
                fullWidth
                onChange={(e)=>{setPassword(e.target.value)}}
                diable
                id="name"
                label="New Password"
        		error={Epassword}
                InputLabelProps={{
            shrink: true,
          }}
          
                
            
              
                 
              />
            </Grid>
            <Grid item xs={12}>
               <TextField
                autoComplete="code"
                name="code"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="code"
                label="Re-Enter New Password"
                onChange={(e)=>{setRPassword(e.target.value)}}
                error={ERpassword}
                value={Rpassword}
                InputLabelProps={{
            shrink: true,
          }}
         
           
            
                 
              />
            </Grid>
            <Grid item xs={12} style={{textAlign:"center"}}>
              	
 <Button  variant="contained" color="secondary" onClick={()=>SUBMIT()}>
             	Update
            </Button>
            </Grid>



            

            
            
          </Grid>
          
          
        </form>
        </Container>
        </div>
      </Dialog>
    </div>
   
      
    </Container>

  );
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
    Update:(password,token,props)=>{dispatch(NGO_FORGOT_PASSWORD(password,token,props))}
}
}




export default connect(null,mapDispatchToProps)(Ngo_Forgot);