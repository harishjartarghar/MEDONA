import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { connect  } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: "60%",
    backgroundColor: theme.palette.background.paper,
    margin:"auto",
    border:"2px solid rgb(138,35,135)",
    marginBottom:"10px"
  },
}));

function CheckboxList({data,Deletecart,...props}) {
  const classes = useStyles();
  const [qty,setQuantity]=useState(data.qty);


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
			setQuantity(item.qty+1)
			return {...item,qty:item.qty+1}
		}
		return item
	})
	
	
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
				
			setQuantity(item.qty-1)
			return {...item,qty:item.qty-1}
		}
		return item
	});
	
	
	localStorage.setItem("cart",JSON.stringify(list));
}



  return (
    <List className={classes.root} key={data._id}>
          <ListItem  role={undefined} dense button >
            <ListItemIcon>
              <DeleteIcon style={{color:"red"}} onClick={()=>{Deletecart(data._id)}}/>
            </ListItemIcon>
            <ListItemText
          primary={data.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                
              </Typography>
             Category : {data.category}<br/>Expiry :{moment(data.expiry).format("DD-MM-YYYY")}
            </React.Fragment>
          }
        />
            <ListItemSecondaryAction key={data._id}>
               <IconButton aria-label="add to favorites">
                          <AddIcon onClick={Add}/>
                </IconButton>
                        {qty}
                <IconButton aria-label="add to favorites"  >
                  <RemoveIcon onClick={Minus}/>
                </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
    </List>
  );
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(CheckboxList);