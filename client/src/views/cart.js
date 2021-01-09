
import React from "react";
import List from '../components/list'; 
import {Grid,Menu,MenuItem,Chip,TextField,Tooltip,Typography,Button} from '@material-ui/core';
import {NEW_ORDER} from '../redux/actions/donationAction';
import { connect } from 'react-redux';
import DetailForm from '../components/Detail'


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart:JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[]

        
    };
   
  }


  
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
      { this.state.cart.map(item=>(item.qty>0?<List data={item} key={item._id} Deletecart={this.Deletecart}/>:null))}
      {this.state.cart.length>0?<div style={{textAlign:"center",marginTop:"50px"}}>
              <Button variant="contained" color="secondary" onClick={()=>{this.props.Place_Order(this.props)}}>
                Place Order
          </Button>
            </div>:null}

      </div>

    );
  }
}



const mapDispatchToProps=(dispatch)=>{
return{
    Place_Order:(props)=>{dispatch(NEW_ORDER(props))},
}
}

export default connect(null,mapDispatchToProps)(Cart);