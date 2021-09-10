import { collection, onSnapshot, query } from "@firebase/firestore";
import React from "react";
import { db } from "../firebase";
import Review from "./Review";

function Reviews() {
  const [reviews, setReviews] = React.useState();

  React.useEffect(() => {
    const get_reviews = async () => {
      const q = query(collection(db, "reviews"));
      onSnapshot(q, (querySnapshot) => {
        setReviews(querySnapshot.docs);
      });
    };
    get_reviews();
  }, []);
  if (!reviews) return "Loading";
  return reviews.map((doc, index) => {
    return (
      <Review
        rating={doc.data().star}
        review={doc.data().review}
        key={doc.id}
      />
    );
  });
}

export default Reviews;
