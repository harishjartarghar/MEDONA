import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 

export default function SnackBar(props) {
  const { snackbar, snackbar_message, snackbar_type } = useSelector(state => state.snackbar);
  
  return (
    <Snackbar
      open={snackbar}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      key={`bottom,center`}
    >
      <Alert  severity={snackbar_type} className="medium_font">
        {snackbar_message}
      </Alert>
    </Snackbar>
  );
}