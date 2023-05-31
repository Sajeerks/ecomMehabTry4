import React from "react";
import "./ReviewCard.css";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  const [value, setValue] = React.useState(review?.rating || 2 );
  // console.log({review})
  return (
    <div className="reviewCardMaain">
        <div>  <img src={review.user?.avatar && review.user.avatar.url}/> </div>
      <div>{review?.name &&  review.name}</div>
      <div>
        {" "}
        <Rating
          readOnly={true}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />{" "}
      </div>

      <div> { review?.comment && review.comment}</div>
    </div>
  );
};

export default ReviewCard;
