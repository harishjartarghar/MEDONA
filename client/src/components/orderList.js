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

function CheckboxList({data,...props}) {
  const classes = useStyles();
 



  return (
    <List className={classes.root} key={data._id}>
    <Typography variant="h6" style={{textAlign:"center"}}><u>Order No : #{data._id}</u></Typography>
          {data.item.map((item,index)=>(
                    	<ListItem  role={undefined} dense button >
                      <ListItemIcon>
                        {index+1}
                      </ListItemIcon>
                      <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          
                        </Typography>
                       Category : {item.category}<br/>Expiry :{moment(item.expiry).format("DD-MM-YYYY")}
                      </React.Fragment>
                    }
                  />
                      <ListItemSecondaryAction >
                        Quantity: {item.qty}
                      </ListItemSecondaryAction>
                    </ListItem>))}
    </List>
  );
}

const mapDispatchToProps=(dispatch)=>{
return{
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(CheckboxList);