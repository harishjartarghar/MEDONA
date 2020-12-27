
import React from "react";
import List from '../components/list'; 
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip,Typography,Button} from '@material-ui/core';
import {GET_ALL_DONATIONS} from '../redux/actions/donationAction';
import { connect } from 'react-redux';
import DetailForm from '../components/Detail'


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart:JSON.parse(localStorage.getItem("cart"))

        
    };
   
  }

 componentDidMount=()=>{this.props.Get_Donations()}
  
 Deletecart=(id)=>
{
	const list=this.state.cart;
	const newList = list.filter((item) => item._id !== id);
	this.setState({cart:newList});
	localStorage.setItem("cart",JSON.stringify(newList));
}

  render() {
   

   

    return (
      <div>
      <Typography variant="h5" style={{textAlign:"center",marginBottom:"20px"}}>My Cart</Typography>
      { this.state.cart.map(item=>(item.qty>0?<List data={item} Deletecart={this.Deletecart}/>:null))}
      <div style={{textAlign:"center",marginTop:"50px"}}>
      	<Button variant="contained" color="secondary" >
  				Place Order
	  </Button>
      </div>

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
    Get_Donations:()=>{dispatch(GET_ALL_DONATIONS())},
}
}

export default connect(mapStatetoProps,mapDispatchToProps)(Cart);