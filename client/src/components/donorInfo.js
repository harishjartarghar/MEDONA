[01:38, 12/6/2020] harish_jartarghar: ok
[01:39, 12/6/2020] Kirthinandan Rvce: import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function MyAccount() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <div>
      <h1 > Account Info </h1>
      <br /><br />
        <TextField
          label="First Name"
          id="margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          margin="none"          
        />
        
        <TextField
          label="Last Name"
          id="margin-none"
          defaultValue="Default Value"
          className={classes.textField}          
          margin="none"
        />
        <br />
        <TextField
          label="Email ID"
          id="margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          
          margin="normal"
        />
        <br />
        <TextField
          label="Password"
          id="filled-margin-none"
          type="password"
          defaultValue="Default Value"
          className={classes.textField}
          
          variant="filled"
        />
        <br /><br />
        <TextField
          label="Re-enter Password"
          id="filled-margin-none"
          type="password"
          defaultValue="Default Value"
          className={classes.textField}
          
          variant="filled"
        />
        <br /><br />
        <TextField
          label="Contact No."
          id="filled-margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          
        />
        
        <TextField
          label="City"
          id="filled-margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          
        />
        <br />
        <br />
        <Button variant="outlined" color="primary">
        Edit   
      </Button>
      
      <Button variant="outlined" color="secondary">
        Update
      </Button>
      </div>
      
    </div>
  );
}