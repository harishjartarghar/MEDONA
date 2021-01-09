import React, { useState } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SendIcon from '@material-ui/icons/Send';

import "./style.css";
import Messages from '../components/Messages';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));


const Chat = props => {
   const classes = useStyles();
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = message => {
    const data = {
      message
    };

    axios
      .post("http://localhost:8080/api/chatbot", data)
      .then(response => {
        const responseData = {
          text: response.data["message"]["fulfillmentText"] != "" ? response.data["message"]["fulfillmentText"] : "Sorry, I can't get it. Can you please repeat once?",
          isBot: true
        };

        setResponses(responses => [...responses, responseData]);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const handleMessageChange = event => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = event => {
    const message = {
      text: currentMessage,
      isBot: false
    };
      setResponses(responses => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage("");
    
    
  };

  return (
    <div className="login">
     <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AddBoxIcon className={classes.icon} />
          <Typography variant="h5" color="inherit" noWrap>
            Medona
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
    <div className="chatSection">
     {/*<Typography variant="h5" style={{textAlign:"center",color:"white"}}>MEDONA ASSISTANCE</Typography>*/}
      <div className="botContainer">

        <div className="messagesContainer">
          <Messages messages={responses} />
        </div>
        <div className="inputSection">
          <input
            type="text"
            value={currentMessage}
            onChange={handleMessageChange}
            
            placeholder="Type Here..."
            className="messageInputField"
          />
          <SendIcon style={{marginRight:"10px",color:"white",marginTop:"10px"}} onClick={handleSubmit}/>
        </div>
      </div>
    </div>
    </Container>
    </div>
  );
};

export default Chat;