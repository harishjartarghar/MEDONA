import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Slide,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container,Tooltip} from '@material-ui/core';
import AutoComplete from './autocomplete';
import {Medicine} from '../assets/data';
import {NEW_DONATION,DELETE_DONATION,UPDATE_DONATION} from '../redux/actions/donationAction';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import {NGO_PROFILE,NGO_PASSWORD} from '../redux/actions/authActions';
import { useDispatch,useSelector ,connect} from "react-redux";
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
	root:{
		
		width:"100%",
		height:"100%",
    padding:"10px"

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

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
    container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"20px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#fff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide s direction="up" ref={ref} {...props} />;
});

function Account({item,...props}) {
  const classes = useStyles();
  const { name, email, mobile,city,id ,alternate} = useSelector(state => state.auth.user);

const [edit,setEdit]=useState(true);
const [Name,setName]=useState(name);
  const [Ename,setEName]=useState(false);
  const [Email,setEmail]=useState(email);
  const [Mobile,setMobile]=useState(mobile);
  const [Alternate,setAlternate]=useState(alternate);
  const [EMobile,setEmobile]=useState(false);
  const [City,setCity]=useState(city);
  const [Ecity,setECity]=useState(false);
  const [password,setPassword]=useState(null);
  const [Epassword,setEPassword]=useState(null);
  const [Rpassword,setRPassword]=useState(null);
  const [ERpassword,setERPassword]=useState(null);
 
 

  
function onSubmit()
{
  if(Name==="" || Name===null || Name===undefined)
  {
  	props.Alert("Name should not be empty!","error");
  	return;
  }

  if(Alternate===Mobile)
  {
    props.Alert("Primary and Alternate Mobile Cannot be same!","error");
    return;
  }
  


  const data={id:id,name:Name,alternate:Alternate,email,mobile:Mobile}
  props.Update_Profile(data);
  setEdit(true);
  
      

}

function ChangePassword()
{
  if(password==="" || password===null || password===undefined)
  {
  	props.Alert("Password is required!","error");
  	return;
  }
   if(Rpassword==="" || Rpassword===null || Rpassword===undefined)
  {
  	props.Alert("Re-enter Password should not be empty!","error");
  	return;
  }

    if(Rpassword!==password)
  {
  	props.Alert("Passwords do not match :)","error");
  	return;
  }
  
props.Update_Password(password);
setPassword(null);
setRPassword(null);
  
  
      

}




  return (
    <Grid container spacing={2} style={{marginTop:"30px"}}>
    <Grid item xs={6} style={{borderRight:"1px solid black",margin:"auto"}}>
    <div>
      <CssBaseline />
      <div className={classes.paper}>
       <Typography variant="h5">Account Info</Typography>
        <div className={classes.root}>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <TextField
                name="name"
                variant="filled"
                required
                fullWidth
                
                id="name"
                label="NGO Name"
            	onChange={(e)=>{setName(e.target.value)}}
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	  
            readOnly: edit,

          }}
               value={Name}
             
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="category"
                variant="filled"
                required
                fullWidth
                id="Email"
                label="Email"
              
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	  
            readOnly: true,

          }}
                
               value={Email}
              
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                name="quantity"
                variant="filled"
                required
                fullWidth
                id="quantity"
                label="Mobile No."
                type="number"
               	onChange={(e)=>{setMobile(e.target.value)}}
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	 
            readOnly: true,

          }}
                
               value={Mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                name="expiry"
                variant="filled"
                required
                fullWidth
                id="expiry"
                label="Alternate Mobile No:"
               	onChange={(e)=>{setAlternate(e.target.value)}}
                

                InputLabelProps={{
            shrink: true,
          }}
              inputProps={{
          	  
            readOnly: edit,

          }}
               value={Alternate}
            
                 
              />
            </Grid> 
          </Grid>
          
          
        </form>
        </Container>
         <Grid container spacing={2}>
           {edit?<> <Grid item xs={12} style={{textAlign:"center",marginTop:"10px"}}>
                        <Button size="small"  variant="contained" color="secondary" onClick={()=>setEdit(false)} >
				              Edit
				            </Button>
                       </Grid>
                       </>:
                       <>
                     <Grid item xs={12} style={{textAlign:"center",margin:"auto",marginTop:"10px"}}>
                        <Button size="small"  variant="contained" color="secondary" onClick={onSubmit} >
				              update
				            </Button>
                       </Grid>
                     <Grid item xs={12} style={{textAlign:"center",margin:"auto"}}>
                        <Button size="small"  variant="contained" onClick={()=>{setEdit(true)}}>
				              cancel
				            </Button>
                       </Grid>
                       </>
                   }
             </Grid>
        </div>
     
    </div>
   
      
    </div>
    </Grid>
    <Grid item xs={6}>
    <div>
      <CssBaseline />
      <div className={classes.paper}>
       <Typography variant="h5">Change Password</Typography>
        <div className={classes.root}>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <TextField
                name="name"
                
                required
                fullWidth
               variant="filled"
                id="name"
                type="password"
                label="Password"
            	onChange={(e)=>{setPassword(e.target.value)}}
                InputLabelProps={{
            shrink: true,

          }}
          
               value={password}
             
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="category"
                variant="filled"
                required
                fullWidth
                id="Email"
                type="password"
                label="Re-enter Password"
            	  onChange={(e)=>{setRPassword(e.target.value)}}
              	

              
            InputLabelProps={{
            shrink: true,

          }}
          
                
               value={Rpassword}
              
              />
            </Grid>
           
          </Grid>
          
          
        </form>
        </Container>
         <Grid container spacing={2}>
          <Grid item xs={12} style={{textAlign:"center",marginTop:"10px"}}>
                        <Button size="small"  variant="contained" color="secondary" onClick={ChangePassword} >
				              Change Password
				            </Button>
                       </Grid>
             </Grid>
        </div>
     
    </div>
   
      
    </div>
    </Grid>
    </Grid>

  );
}

const mapDispatchToProps=(dispatch)=>{
return{
   Update_Profile:(data)=>{dispatch(NGO_PROFILE(data))},
   Update_Password:(password)=>{dispatch(NGO_PASSWORD(password))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(Account);