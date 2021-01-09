
import React from "react";
import List from '../components/orderList'; 
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip,Typography,Button} from '@material-ui/core';
import {GET_ALL_ORDER} from '../redux/actions/donationAction';
import { connect } from 'react-redux';
import DetailForm from '../components/Detail'


class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      

        
    };
   
  }


   componentDidMount=()=>{this.props.Get_Order()}


 render() {

    return (
      <div>
      <Typography variant="h5" style={{textAlign:"center",marginBottom:"20px"}}>My Orders</Typography>
      { this.props.donation.order.map(item=><List data={item} key={item._id} />)}
     
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
    Get_Order:(props)=>{dispatch(GET_ALL_ORDER(props))},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Order);