import React from "react";
import ReactStars from 'react-rating-stars-component';
import profileImg from '../../assets/profile.png'

const ReviewCard = ({ review }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: 20,
    value: review.rating,
    isHalf: true,
  }

  return (
    <div className="reviewCard">
      <img src={profileImg} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewComment">{review.comment}</span>
    </div>
  )
};

export default ReviewCard;
