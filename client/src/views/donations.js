
import React from "react";
import Card from '../components/donorCard'; 
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip} from '@material-ui/core';
import {GET_DONATIONS} from '../redux/actions/donationAction';
import { connect } from 'react-redux';
import DetailForm from '../components/Detail'


class Donations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      item:""

        
    };
   
  }

 componentDidMount=()=>{this.props.Get_Donations()}
  
 

  render() {
   

   

    return (
      <div>
       <Grid item container xs={12} spacing={5} style={{margin:"auto"}}>
        {
          this.props.donation.donations.map(item=>{
            return (
             
              <Grid item xs={12} sm={12} md={3} key={item._id} onClick={()=>{this.setState({modal:true,item:item})}}>
                    <Card data={item} />
              </Grid>
              );
          })
        }

        </Grid>
        
        
      {this.state.modal?<DetailForm modal={this.state.modal} toggle={()=>{this.setState({modal:false,item:""})}} item={this.state.item}/>:null}
      </div>
    );
  }
}

const mapStatetoProps=(state)=>{
    return{
      donation:state.donation,
      auth:state.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
return{
    Get_Donations:()=>{dispatch(GET_DONATIONS())},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Donations);