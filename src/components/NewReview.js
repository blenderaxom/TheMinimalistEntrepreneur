import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "@firebase/firestore";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { db } from "../firebase";
import { buttonStyles } from "../styles/button";

function NewReview({ open, setOpen }) {
  const classes = useStyles();
  const buttonClasses = buttonStyles();
  const [star, setStar] = React.useState(4);
  const [review, setReview] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await addDoc(collection(db, "reviews"), {
        star: star,
        review: review,
      });
      if (star === 1) {
        await updateDoc(doc(db, "main", "total"), { one: increment(1) });
      } else if (star === 2) {
        await updateDoc(doc(db, "main", "total"), { two: increment(1) });
      } else if (star === 3) {
        await updateDoc(doc(db, "main", "total"), { three: increment(1) });
      } else if (star === 4) {
        await updateDoc(doc(db, "main", "total"), { four: increment(1) });
      } else if (star === 5) {
        await updateDoc(doc(db, "main", "total"), { five: increment(1) });
      } else if (star === 0.5) {
        await updateDoc(doc(db, "main", "total"), { half: increment(1) });
      } else if (star === 1.5) {
        await updateDoc(doc(db, "main", "total"), { onehalf: increment(1) });
      } else if (star === 2.5) {
        await updateDoc(doc(db, "main", "total"), { twohalf: increment(1) });
      } else if (star === 3.5) {
        await updateDoc(doc(db, "main", "total"), { threehalf: increment(1) });
      } else if (star === 4.5) {
        await updateDoc(doc(db, "main", "total"), { fourhalf: increment(1) });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setStar(4);
      setReview("");
      setOpen(false);
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography className={classes.title}>What's your rating?</Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" style={{ gap: 30 }}>
          <Typography variant="h6" className={classes.subTitle}>
            Rating
          </Typography>
          <Rating
            name="size-large"
            value={star}
            onChange={(e, newValue) => {
              setStar(newValue);
            }}
            size="large"
            precision={0.5}
            disabled={submitting}
          />
          <Typography variant="h6" className={classes.subTitle}>
            Review
          </Typography>
          <InputBase
            placeholder="Start typing..."
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            disabled={submitting}
            multiline
          />
          <div>
            <Button
              variant="contained"
              fullWidth={false}
              className={buttonClasses.simple}
              disableElevation
              size="large"
              disabled={submitting}
              onClick={handleSubmit}
            >
              <Box display="flex" alignItems="center" style={{ gap: 10 }}>
                {submitting && <CircularProgress />} Submit Review
              </Box>
            </Button>
          </div>
          <div />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NewReview;
const useStyles = makeStyles({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 700,
    fontSize: 40,
  },
  subTitle: {
    fontWeight: 500,
  },
});
