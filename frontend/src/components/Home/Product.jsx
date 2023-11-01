import React from "react"
import { NavLink } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

const Product = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    size: 20,
    value: product.rating,
    isHalf: true,
  }
  
  return (
    <NavLink className="productCard" to={product._id}>
      <img src={product.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <ReactStars {...options} /> <span>{product.reviewsCount} Reviews</span>
      </div>

      <span>₹{product.price}</span>
    </NavLink>
  )
}

export default Product
