import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    marginDown: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  title: {
    fontFamily:'monospace', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textDecorationLine: 'underline'
  },
  container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"20px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#fff'
  }
  
}));

export default function AddressForm({handleInputChange,data}) {
  const classes = useStyles();
  


  return (
    <Container className={classes.container}  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography className={classes.title} component="h1" variant="h5">
          Address
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="street"
                name="street"
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                size="small"
                autoFocus
            	value={data.street}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Estreet}
              />
            </Grid>
          
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="city"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                size="small"
            	value={data.city}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Ecity}
              />
            </Grid>
            <Grid item xs={12} sm={6}> 
              <TextField
                autoComplete="district"
                name="district"
                required
                variant="outlined"
                required
                fullWidth
                id="district"
                label="District"
                size="small"
                
            	value={data.district}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Edistrict}
              />
            </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="state"
                name="state"
                variant="outlined"
                required
                fullWidth
                id="state"
                label="state"
                size="small"
              	required
            	value={data.state}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Estate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="pincode"
                name="pincode"
                variant="outlined"
                required
                fullWidth
                id="pincode"
                label="Pincode"
                size="small"
                
            	value={data.pincode}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Epincode}
              />
            </Grid>
           
            
            
          </Grid>
          
          
        </form>
      </div>
      
    </Container>
  );
}
