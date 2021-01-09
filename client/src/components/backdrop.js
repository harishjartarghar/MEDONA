import React from 'react';
import {Backdrop,CircularProgress,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const { drop } = useSelector(state => state.snackbar);
  

  return (
    <div>
      <Backdrop className={classes.backdrop} open={drop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}