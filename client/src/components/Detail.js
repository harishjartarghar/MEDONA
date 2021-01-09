import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Slide,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container,Tooltip} from '@material-ui/core';
import AutoComplete from './autocomplete';
import {Medicine} from '../assets/data';
import {NEW_DONATION,DELETE_DONATION,UPDATE_DONATION} from '../redux/actions/donationAction';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { useDispatch,useSelector ,connect} from "react-redux";
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
	root:{
		background:'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("https://onlinepithoragarh.in/wp-content/uploads/2018/04/Kalpasi-Medical-Store-Pithoragarh-1.jpeg") ',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width:"100%",
		height:"100%",
    padding:"10px"

	},
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign:"center"
  },
  paper: {
    marginTop: 'auto',
    marginDown: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"honeydew",

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
    container:{
  	border:'2px solid rgb(138,35,135)',
  	padding:"20px",
  	 marginTop: theme.spacing(2),
  	 backgroundColor:'#fff'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide s direction="up" ref={ref} {...props} />;
});

function Detail({modal,toggle,item,...props}) {
  const classes = useStyles();

const [edit,setEdit]=useState(true);
const [name,setName]=useState(item.name);
  const [Ename,setEName]=useState(false);
  const [category,setCategory]=useState(item.category);
  const [Ecategory,setECategory]=useState(false);
  const [quantity,setQuantity]=useState(item.quantity);
  const [Equantity,setEQuantity]=useState(false);
  const [expiry,setExpiry]=useState(item.expiry);
  const [Eexpiry,setEExpiry]=useState(false);
  const [remarks,setRemarks]=useState(item.remarks);

  
function onSubmit()
{
  if(name===undefined || name==="")
  {
    setEName(true);
    setECategory(false);
    setEExpiry(false);
    setEQuantity(false);
    props.Alert("Enter Medicine Name","error");
    return;
  }

  if(category===undefined || category==="")
  {
    setEName(false);
    setECategory(true);
    setEExpiry(false);
    setEQuantity(false);
    props.Alert("Enter Medicine Category","error");
    return;
  }

  if(quantity===undefined || quantity==="" || quantity<=0)
  {
    setEName(false);
    setECategory(false);
    setEExpiry(false);
    setEQuantity(true);
    props.Alert("Enter Medicine Quantity","error");
    return;
  }

  if(expiry===undefined || expiry==="")
  {
    setEName(false);
    setECategory(false);
    setEExpiry(true);
    setEQuantity(false);
    props.Alert("Enter Medicine Expiry Date","error");
    return;
  }

    setEName(false);
    setECategory(false);
    setEExpiry(false);
    setEQuantity(false);
    

    const data = {id:item._id,name,category,quantity,expiry}
    props.Update_Donation(data);
    toggle();
      setName(null);
      setCategory(null);
      setQuantity(null);
      setExpiry(null);
      setRemarks(null);
      

}




  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog  open={modal} onClose={toggle}  TransitionComponent={Transition}>
       
       
        <div className={classes.root}>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Medicine Name"
            	onChange={(e)=>{setName(e.target.value)}}
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	  style: { textAlign: edit?'center':'left' },
            readOnly: edit,

          }}
               value={name}
             
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="category"
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Medicine Category"
              	onChange={(e)=>{setCategory(e.target.value)}}
              
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	  style: { textAlign: edit?'center':'left' },
            readOnly: edit,

          }}
                
               value={category}
              
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                name="quantity"
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                type="number"
               	onChange={(e)=>{setQuantity(e.target.value)}}
                InputLabelProps={{
            shrink: true,

          }}
          inputProps={{
          	  style: { textAlign: edit?'center':'left' },
            readOnly: edit,

          }}
                
               value={quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                name="expiry"
                variant="outlined"
                required
                fullWidth
                id="expiry"
                label="Expiry"
               	onChange={(e)=>{setExpiry(e.target.value)}}
                type="date"

                InputLabelProps={{
            shrink: true,
          }}
              inputProps={{
          	  style: { textAlign: edit?'center':'left' },
            readOnly: edit,

          }}
               value={moment(expiry).format("YYYY-MM-DD")}
            
                 
              />
            </Grid>

            <Grid item xs={12}>
            
            </Grid>

             <Grid item xs={12}>
               <TextField
                name="remarks"
                multiline
                variant="outlined"
                fullWidth
                id="remarks"
                label="Remarks"
                rows={3}
                onChange={(e)=>{setRemarks(e.target.value)}}
                InputLabelProps={{
            shrink: true,
          }}
              inputProps={{
          	  style: { textAlign: edit?'center':'left' },
            readOnly: edit,

          }}
              value={remarks==="null"?"":remarks}
              />
            </Grid>

           {item.sold==0?edit?<> <Grid item xs={6} style={{textAlign:"center",margin:"auto"}}>
                       <Tooltip title="Edit">
                          <EditIcon fontSize="large" style={{color:"orange",margin:"auto"}} onClick={()=>{setEdit(false)}}/> 
                       </Tooltip>
                       </Grid>
           
           
                       <Grid item xs={6} style={{textAlign:"center"}}>
                       <Tooltip title="Delete">
                          <DeleteIcon fontSize="large" style={{color:"red"}} onClick={()=>{toggle();props.Delete_Donation(item._id)}}/>
                        </Tooltip>
                       </Grid>
                       </>:
                       <>
                     <Grid item xs={12} style={{textAlign:"center",margin:"auto"}}>
                        <Button size="small"  variant="contained" color="secondary" onClick={onSubmit} >
                      update
                    </Button>
                       </Grid>
                     <Grid item xs={12} style={{textAlign:"center",margin:"auto"}}>
                        <Button size="small"  variant="contained" onClick={()=>{setEdit(true)}}>
                      cancel
                    </Button>
                       </Grid>
                       </>:null
                   }

            
          </Grid>
          
          
        </form>
        </Container>
        </div>
      </Dialog>
    </div>
   
      
    </div>

  );
}

const mapDispatchToProps=(dispatch)=>{
return{
   New_Donation:(data)=>{dispatch(NEW_DONATION(data))},
   Delete_Donation:(id)=>{dispatch(DELETE_DONATION(id))},
   Update_Donation:(data)=>{dispatch(UPDATE_DONATION(data))},
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(Detail);