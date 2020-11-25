import React from "react";
import {Redirect} from "react-router-dom";
import Stepper from '../components/stepper';
import DetailForm from '../components/DetailForm';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '../components/AppBar';


class DonorRegister extends React.Component {

constructor(props)
{	
	super(props);
	this.state={
		activeStep:1,
    steps:['FILL BASIC DETAILS', 'SET PASSWORD']
	}
}

useQuery =()=> {return new URLSearchParams(this.props.location.search);}

getStepContent=(stepIndex)=> {
  switch (stepIndex) {
    case 0:
      return 'EMAIL VERIFIED';
    case 1:
      return 'BASIC DETAILS';
    case 2:
      return 'SET PASSWORD';
    default:
      return 'Unknown stepIndex';
  }
}





  
  handleNext = () => {
    this.setState({activeStep:this.state.activeStep + 1});
  };

  handleBack = () => {
  	this.setState({activeStep:this.state.activeStep===1?this.state.activeStep:this.state.activeStep - 1});
  };

  handleReset = () => {
    this.setState({activeStep:1});
  };

render(){
	let query = this.useQuery();

	if(query.get("token")===undefined || query.get("token")===null || query.get("token")==="")
		return <Redirect to="/login"/>;
	
	return (
    <div className="donor">
    <AppBar/>
 		<Container>
   
 		<Stepper activeStep={this.state.activeStep} steps={this.state.steps}/>
 		<DetailForm/>
 	<div>
        {this.state.activeStep === 3 ? (
          <div style={{textAlign:"center"}}>
            <Button onClick={this.handleReset}>Reset</Button>
            <Button variant="contained" color="primary">Submit</Button>
          </div>
        ) : (
          <div style={{textAlign:"center"}}>
            
            <div>
              {this.state.activeStep===1?null:<Button
                              disabled={this.state.activeStep === 0}
                              onClick={this.handleBack}
                              
                            >Back
              </Button>}
                
              <Button variant="contained" color="primary" onClick={this.handleNext}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
 	    </Container>
      </div>
			);
	
	}
  
}

export default DonorRegister;
