import { Box, makeStyles } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

function Review({ rating, review }) {
  const classes = useStyles()
  return (
    <Box display="flex" alignItems="center" style={{gap: 20, marginTop: 15}}>
      <Rating value={parseFloat(rating)} precision={0.5} readOnly />
      <div><strong>{rating}</strong>, <span className={classes.subtitle}>{review}</span></div>
    </Box>
  );
}

export default Review;
const useStyles = makeStyles({
  subtitle: {
    color: '#00000090'
  }
})
