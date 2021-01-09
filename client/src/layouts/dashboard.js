import React,{useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from '../components/sidebar';
import { Route, Switch, Redirect } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import New_Donation from '../components/NewDonation'
import routes from '../utils/routes';
import { useDispatch,useSelector ,connect} from "react-redux";
import base64 from 'base-64';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#d5fefd',
    backgroundImage: 'linear-gradient(310deg, #d5fefd 0%, #fffcff 85%);',
    position: 'relative',
    height:"inherit"
  }
,
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
const dispatch = useDispatch()
 

   if(!localStorage.getItem("jwt"))
    {
        props.history.push("/login");
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
     <Sidebar {...props}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            {routes.map((prop, key) => {
            if(prop.type===base64.decode(localStorage.getItem(base64.encode("type"))))
             return   (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                  
                />
              );
            })}
            <Redirect to="/dashboard/store"/>
          </Switch>
      </main>
      {
        "donor"===base64.decode(localStorage.getItem(base64.encode("type")))?
        <>
        <Tooltip title="Donate Medicine" aria-label="add" arrow>
             <Fab color="primary"  className={classes.fab} aria-label="add" onClick={() => dispatch({ type: 'DONATION_MODAL' })}>
               <AddIcon />
           </Fab>
        </Tooltip>
        <New_Donation/>
        </>:null
      } 
    </div>
  );
}


