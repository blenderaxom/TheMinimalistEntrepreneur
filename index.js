import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPixmuIQCV8tSheU6rV874fB0cANn8BWc",
  authDomain: "theminimalistentrepreneur.firebaseapp.com",
  projectId: "theminimalistentrepreneur",
  storageBucket: "theminimalistentrepreneur.appspot.com",
  messagingSenderId: "976512450438",
  appId: "1:976512450438:web:3b6e0c765d12433ec83607",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Get the required html elements from document
const new_rating_div = document.getElementById("new_rating");
const add_review_button = document.getElementById("add_review");
const submit_button = document.getElementById("submit_button");
const user_review = document.getElementById("review");
const reviews = document.getElementById("reviews");
const total_rating = document.getElementById("total");
const stars = document.getElementsByClassName("star");

// This function updates the stars on click in new review section
const updateStars = () => {
  Array.from(stars).map((el, index) => {
    const val = el.getAttribute("value");
    if (star >= val) el.innerText = "★";
    else el.innerText = "☆";
  });
};

// Gets the reviews and total ratings from backend and updates the dom elements
const get_reviews_and_update = async () => {
  reviews.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "reviews"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const review_el = document.createElement("div");
    review_el.innerText = `${get_star_string(Math.round(data.star))} ${data.star}, ${data.review}`;
    reviews.appendChild(review_el);
  });
  const totalDoc = await getDoc(doc(db, "main", "total"));
  const ratingsCount = totalDoc.data();
  const total_rating_calc =
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

  total_rating.innerText =
    total_rating_calc.toFixed(1).toString() + " " + get_star_string(Math.round(total_rating_calc));
};

// The star rating of user in new review section.
let star = 0;

submit_button.onclick = async (e) => {
  e.preventDefault();
  const review = user_review.value;
  try {
    submit_button.innerText = "Submitting...";
    submit_button.disabled = true;
    await addDoc(collection(db, "reviews"), {
      star: star,
      review: review,
    });
    if (star == 1) {
      await updateDoc(doc(db, "main", "total"), { one: increment(1) });
    } else if (star == 2) {
      await updateDoc(doc(db, "main", "total"), { two: increment(1) });
    } else if (star == 3) {
      await updateDoc(doc(db, "main", "total"), { three: increment(1) });
    } else if (star == 4) {
      await updateDoc(doc(db, "main", "total"), { four: increment(1) });
    } else if (star == 5) {
      await updateDoc(doc(db, "main", "total"), { five: increment(1) });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    new_rating_div.style.display = "none";
    submit_button.innerText = "Submit Review";
    submit_button.disabled = false;
    get_reviews_and_update();
  }
};

new_rating_div.style.display = "none"; // New rating div is hidden by default

// Show New rating div on Add Review button clicked
add_review_button.onclick = () => {
  new_rating_div.style.display = "block";
  star = 0;
  user_review.value = "";
  updateStars();
};

// Update stars when clicked in new review section
Array.from(stars).forEach((el) => {
  el.onclick = (e) => {
    e.preventDefault();
    star = el.getAttribute("value");
    updateStars();
  };
});

// Initially get the reviews
get_reviews_and_update();

function get_star_string(star) {
  if (star < 2) return "★☆☆☆☆";
  else if (star < 3) return "★★☆☆☆";
  else if (star < 4) return "★★★☆☆";
  else if (star < 5) return "★★★★☆";
  else return "★★★★★";
}
