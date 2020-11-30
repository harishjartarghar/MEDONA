import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import routes from '../routes';
import Sidebar from '../components/sidebar';
import { Route, Switch, Redirect } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
 
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
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default function Dashboard() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
     <Sidebar routes={routes}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            {routes.map((prop, key) => {
             return   (
                <Route
                  exact
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                  
                />
              );
            })}
            <Redirect to="/dashboard"/>
          </Switch>
      </main>
      <Tooltip title="Donate Medicine" aria-label="add" arrow>
      <Fab color="primary"  className={classes.fab} aria-label="add">
  			<AddIcon />
	  </Fab>
	  </Tooltip>
      
    </div>
  );
}


