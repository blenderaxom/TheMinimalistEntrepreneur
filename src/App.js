import {  Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Reviews from "./components/Reviews";
import SubHeader from "./components/SubHeader";

function App() {
  const classes = useStyles();
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" className={classes.title}>
        The Minimalist Entrepreneur
      </Typography>
      <SubHeader />
      <hr />
      <Typography variant="h5" className={classes.subTitle}>
        Reviews
      </Typography>
      <Reviews />
    </Container>
  );
}

export default App;
const useStyles = makeStyles({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 700,
    fontSize: 40
  },
  subTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 500,
  },
});
