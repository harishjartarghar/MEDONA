import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItemText,ListItem,List,Divider,AppBar,Toolbar,Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Slide,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Container} from '@material-ui/core';
import AutoComplete from './autocomplete';
import {Medicine,Category} from '../assets/data';
import {NEW_DONATION} from '../redux/actions/donationAction';
import {showSnackbarAction} from '../redux/actions/snackbarAction';
import { useDispatch,useSelector ,connect} from "react-redux";


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

function NewDonation(props) {
  const classes = useStyles();
  const [name,setName]=useState(undefined);
  const [Ename,setEName]=useState(false);
  const [category,setCategory]=useState(undefined);
  const [Ecategory,setECategory]=useState(false);
  const [quantity,setQuantity]=useState(undefined);
  const [Equantity,setEQuantity]=useState(false);
  const [expiry,setExpiry]=useState(undefined);
  const [Eexpiry,setEExpiry]=useState(false);
  const [medicine,setMedicine]=useState(null);
  const [remarks,setRemarks]=useState(null);
const dispatch = useDispatch()
  const { donationModal } = useSelector(state => state.donation);

  

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
var d1 = new Date();
var d2 = new Date(expiry);


    if(d1.getTime()>d2.getTime())
  {
    setEName(false);
    setECategory(false);
    setEExpiry(true);
    setEQuantity(false);
    props.Alert("Enter Valid Expiry Date!","error");
    return;
  }


    setEName(false);
    setECategory(false);
    setEExpiry(false);
    setEQuantity(false);
    

    const data = new FormData() 
    data.append('image', medicine);
    data.append('name',name);
    data.append('category',category);
    data.append('quantity',quantity);
    data.append('expiry',expiry);
    data.append('remarks',remarks);
    props.New_Donation(data);
      setName(null);
      setCategory(null);
      setQuantity(null);
      setExpiry(null);
      setMedicine(null);
      setRemarks(null);
      

}


  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
    
      <Dialog   fullScreen open={donationModal} onClose={() => dispatch({ type: 'DONATION_MODAL' })}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => dispatch({ type: 'DONATION_MODAL' })} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Medicine Donation
            </Typography>
            <Button autoFocus variant="contained" color="primary" onClick={onSubmit}>
              Donate
            </Button>
          </Toolbar>
        </AppBar>
       
        <div className={classes.root}>
         <Container className={classes.container}  maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <AutoComplete error={Ename} label="Medicine Name" onInput={setName} list={Medicine} category={false} />
            </Grid>
            
            <Grid item xs={12}>
              <AutoComplete error={Ecategory} label="Category" onInput={setCategory} list={Category} category={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                autoComplete="ngoname"
                name="ngoname"
                variant="outlined"
                required
                fullWidth
                id="ngoname"
                label="Quantity"
                type="number"
                onChange={(e)=>setQuantity(e.target.value)}
                InputLabelProps={{
            shrink: true,
          }}
                
               value={quantity}
              //   onChange={(e)=>{handleInputChange(e)}}
                 error={Equantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                autoComplete="ngoname"
                name="ngoname"
                variant="outlined"
                required
                fullWidth
                id="ngoname"
                label="Expiry"
                type="date"
                onChange={(e)=>setExpiry(e.target.value)}

                InputLabelProps={{
            shrink: true,
          }}
              
               value={expiry}
            
                 error={Eexpiry}
              />
            </Grid>

            <Grid item xs={12}>
               <TextField
                autoComplete="ngoname"
                name="ngoname"
                variant="outlined"
                onChange={(e)=>setMedicine(e.target.files[0])}
                
                fullWidth
                id="ngoname"
                label="Medicine Image"
                type="file"
                InputLabelProps={{
            shrink: true,
          }}
              
              // value={data.ngoname}
              //   onChange={(e)=>{handleInputChange(e)}}
              //   error={data.Engoname}
              />
            </Grid>

             <Grid item xs={12}>
               <TextField
                autoComplete="ngoname"
                name="ngoname"
                multiline
                onChange={(e)=>setRemarks(e.target.value)}
                variant="outlined"
                fullWidth
                id="ngoname"
                label="Remarks"
                rows={3}
                InputLabelProps={{
            shrink: true,
          }}
              
              // value={data.ngoname}
              //   onChange={(e)=>{handleInputChange(e)}}
              //   error={data.Engoname}
              />
            </Grid>


            
            
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
    Alert:(message,type)=>{dispatch(showSnackbarAction(message,type))},
}
}

export default connect(null,mapDispatchToProps)(NewDonation);