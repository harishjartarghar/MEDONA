import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardContent,Tooltip} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import donated from '../assets/donated.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage:donated,

    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',
    width: 151,
    
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({data}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
       {data.sold===data.quantity?<img class="card-img-top watermarked" src={donated} alt="" />:null}
      <div className={classes.details} >
       <Tooltip title="click for more info">
      
        <CardContent className={classes.content}  >
          <Typography component="h5" variant="h5">
           {data.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.category}
          </Typography>
           <p>Expiry:{ moment(data.expiry).format("DD-MM-YYYY")}</p>
           <p>Total:{data.quantity}</p>
           <p>Donated:{data.sold}</p>
           Remaining:{data.remaining}
        </CardContent>
        </Tooltip>
        <div className={classes.controls}>
        
        </div>
      </div>
      <CardMedia
        
        className={classes.cover}
        image={data.url}
        title="Medicine Image"
      />
    </Card>
  );
}