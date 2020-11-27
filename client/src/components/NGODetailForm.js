import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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

export default function NGODetailForm({handleInputChange,data}) {
  const classes = useStyles();
  


  return (
    <Container className={classes.container}  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography className={classes.title} component="h1" variant="h5">
          Fill Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="ngoname"
                name="ngoname"
                variant="outlined"
                required
                fullWidth
                id="ngoname"
                label="NGO Name"
                size="small"
                autoFocus
            	value={data.ngoname}
                onChange={(e)=>{handleInputChange(e)}}
                error={data.Engoname}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                value={data.email}
                onChange={(e)=>{handleInputChange(e)}}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mobile"
                name="mobile"
             	error={data.Emobile}
                variant="outlined"
                required
                fullWidth
                disabled
                id="mobile"
                label="Mobile No"
               size="small"
               onChange={(e)=>{handleInputChange(e)}}
               value={data.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={data.EAmobile}
                variant="outlined"
                value={data.Amobile}
                fullWidth
                id="Amobile"
                label="Alternate Mobile"
                name="Alternate Mobile"
                autoComplete="Alternate Mobile"
                size="small"
                onChange={(e)=>{handleInputChange(e)}}
              />
            </Grid>
            
            
          </Grid>
          
          
        </form>
      </div>
      
    </Container>
  );
}
