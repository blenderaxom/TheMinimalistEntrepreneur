import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { Box, Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { db } from "../firebase";
import { buttonStyles } from "../styles/button";
import NewReview from "./NewReview";

function SubHeader() {
  const [total, setTotal] = React.useState();
  const [open, setOpen] = React.useState(false);
  const buttonClasses = buttonStyles();
  React.useEffect(() => {
    const get_total = async () => {
      onSnapshot(doc(db, "main", "total"), (doc) => {
        setTotal(doc.data());
      });
    };
    get_total();
  }, []);

  const total_rating_calc = (ratingsCount) =>
    (5 * ratingsCount.five +
      4 * ratingsCount.four +
      3 * ratingsCount.three +
      2 * ratingsCount.two +
      1 * ratingsCount.one) /
    (ratingsCount.five +
      ratingsCount.four +
      ratingsCount.three +
      ratingsCount.two +
      ratingsCount.one);
  return (
    <div>
      {total && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{ gap: 20, marginTop: 30, marginBottom: 40 }}
        >
          <Box display="flex" alignItems="center" style={{ gap: 20 }}>
            <Typography variant="h4">
              {total_rating_calc(total).toFixed(1)}
            </Typography>
            <Rating
              value={total_rating_calc(total)}
              precision={0.5}
              readOnly
              size="large"
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            className={buttonClasses.simple}
            disableElevation
          >
            Add review
          </Button>
        </Box>
      )}
      <NewReview open={open} setOpen={setOpen} />
    </div>
  );
}

export default SubHeader;
