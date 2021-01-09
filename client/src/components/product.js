import React,{useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardContent,Tooltip,Button} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect  } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',
    width: 151,
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function MediaControlCard({data,...props}) {
  const classes = useStyles();
  const theme = useTheme();
  const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[]);
  var flag=false;
 var status;
  

function Add_TO_CART(){
	var list=JSON.parse(localStorage.getItem("cart"));
	if(!list)
		list=[]
	list.push({...data,qty:1});
	setCart(list);
	props.Alert(data.name+" added to cart!:)","success");
	localStorage.setItem("cart",JSON.stringify(list));
}

function Add(){
	var list=JSON.parse(localStorage.getItem("cart"));
	list=list.map(item=>{
		if(item._id===data._id)
		{
			if(item.qty+1>data.remaining)
			{
				props.Alert(data.name+" are no more available!","error");
				
				return {...item,qty:item.qty}
			}
			return {...item,qty:item.qty+1}
		}
		return item
	})
	setCart(list);
	flag=false;
	
	localStorage.setItem("cart",JSON.stringify(list));
}

function Minus(){
	var list=JSON.parse(localStorage.getItem("cart"));
	list=list.map(item=>{
		if(item._id===data._id)
		{
			if(item.qty-1<0)
				return item
			if(item.qty-1==0)
				props.Alert(data.name+" removed from cart!","success");
				
	
			return {...item,qty:item.qty-1}
		}
		return item
	});
	flag=false;
	setCart(list);
	
	localStorage.setItem("cart",JSON.stringify(list));
}

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
       <Tooltip title="click for more info">
        <CardContent className={classes.content} >
          <Typography component="h5" variant="h5">
           {data.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.category}
          </Typography>
          
            Expiry:{ moment(data.expiry).format("DD-MM-YYYY")}
         
           <Typography variant="subtitle1" color="textSecondary">
            Qty : {data.remaining}
          </Typography>
           
        </CardContent>
        </Tooltip>
        <CardActions disableSpacing style={{margin:"auto"}}>
        
        

        {

        	cart.find(item=>(item._id===data._id && item.qty>0))?
                
                	<div key={data._id}>
                			 <IconButton aria-label="add to favorites" >
                          <AddIcon onClick={Add}/>
                        </IconButton>
                        {cart.find(item=>(item._id===data._id && item.qty>0))["qty"]}
                        <IconButton aria-label="add to favorites"  >
                          <RemoveIcon onClick={Minus}/>
                        </IconButton>
                        </div>
                
                :
                	<IconButton aria-label="add to favorites">
                          <AddShoppingCartIcon onClick={Add_TO_CART}/>
                        </IconButton>
              
                }

        	   
               
        
      </CardActions>
      </div>
      <CardMedia
        
        className={classes.cover}
        image={data.url}
        title="Live from space album cover"
      />
    </Card>
  );
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(MediaControlCard);