
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import './style.css'

const useStyles = makeStyles((theme) => ({
	root:{
		background:`linear-gradient(45deg, rgba(0, 84, 162, 0.45) 0%, rgba(0,
84, 162, 0.45) 25%, rgba(77, 60, 170, 0.45) 25%, rgba(77, 60, 170, 0.45)
50%, rgba(153, 37, 179, 0.45) 50%, rgba(153, 37, 179, 0.45) 75%,
rgba(230, 13, 187, 0.45) 75%, rgba(230, 13, 187, 0.45) 100%), linear-
gradient(135deg, rgb(149, 18, 122) 0%, rgb(149, 18, 122) 25%, rgb(182,
13, 98) 25%, rgb(182, 13, 98) 50%, rgb(214, 8, 74) 50%, rgb(214, 8, 74)
75%, rgb(247, 3, 50) 75%, rgb(247, 3, 50) 100%) `
	},
  title: {
    flexGrow: 1,
    fontFamily:'monospace',
    fontSize:'30px',
    background:``
  },
  tool:{
  	background:'linear-gradient(to right, #141562, #486FBC, #EAB5A1, #8DD6FF, #4973C9, #D07CA7, #F4915E, #F5919E, #B46F89, #141562, #486FBC);background-size: 1000% 1000%;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'
  },
  
}));

export default function MenuAppBar() {

	const classes = useStyles();
	
		return (
     		
     		<AppBar color="secondary">
			  
			
			  
			</AppBar>
     		
  			);
	
  
}

