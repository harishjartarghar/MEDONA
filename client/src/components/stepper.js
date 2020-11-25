import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));


function getSteps() {
  return ['FILL BASIC DETAILS', 'SET PASSWORD'];
}




export default function HorizontalLabelPositionBelowStepper({activeStep}) {
  const classes = useStyles();
  const steps = getSteps();
  
  return (
    <div className={classes.root}>
      <Stepper classes={classes.stepper} activeStep={activeStep} alternativeLabel>
	      <Step key="EMAIL VERIFIED">
	            <StepLabel>EMAIL VERIFIED</StepLabel>
	      </Step>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
   
    </div>
  );
}