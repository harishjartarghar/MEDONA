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
    marginTop: theme.spacing(3),
  },
  container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"10px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#fff'
  },
   title: {
    fontFamily:'monospace', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textDecorationLine: 'underline'
  }
  
}));

export default function SET_PASSWORD({handleInputChange,data}) {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography className={classes.title} component="h1" variant="h5">
          Set Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autofocus
                size="small"
                onChange={handleInputChange}
                value={data.password}
                error={data.Epassword}
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="re_password"
                label="Confirm Password"
                type="password"
                id="re_password"
                autoComplete="current-password"
                size="small"
                onChange={handleInputChange}
                value={data.re_password}
                error={data.Ere_password}
              />
            </Grid>
            
            
          </Grid>
          
          
        </form>
      </div>
      <br/>
    </Container>
  );
}
