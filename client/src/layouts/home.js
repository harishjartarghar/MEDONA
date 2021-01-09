import React from "react";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const cards = [1];

export default function Home(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" >
        <Toolbar onClick={()=>{props.history.push("/")}}>
          <AddBoxIcon className={classes.icon} />
          <Typography variant="h5" color="inherit" noWrap>
            Medona
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Medona
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Medona ,short form for Medicine Donation System, is an initiative
              to provide subtle help to the needy people residing in NGOs with
              our extra medicines.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                 {!localStorage.getItem("jwt")? <Button variant="contained" color="primary" onClick={()=>{props.history.push("/login")}}>
                                     LOGIN
                                   </Button>:
                                   <Button variant="contained" color="primary" onClick={()=>{props.history.push("/dashboard")}}>
                                     Dashboard
                                   </Button>}
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={()=>{props.history.push("/statistics")}}>
                    Our STATISTICS
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="contained" color="secondary" onClick={()=>{props.history.push("/assistance")}}>
                    Chat With Us!
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={5}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://image.shutterstock.com/image-vector/volunteers-collecting-goods-charity-into-260nw-1537715486.jpg"
                    title="Donor"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Donor
                    </Typography>
                    <Typography>
                      Donors can donate their extra left off medicines by means
                      of our online-portal where they can meet recepient NGOs
                      who can contact them and get their medicines for the needy
                      people in the NGOs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="data:image/jpeg;base64,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"
                    title="NGO"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      NGO
                    </Typography>
                    <Typography>
                      NGOs can explore the list of medicines donated by various
                      individual donors and can order the same by interacting
                      with the donors.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          R V College of Engineering, CSE Department.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}