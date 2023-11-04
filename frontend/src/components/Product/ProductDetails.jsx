import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../redux/actions/product.action";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Layout/Loader";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: 20,
    value: product.rating,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetails">
            <div>
              <Carousel>
                {product?.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carouselImage"
                      src={item.url}
                      key={item.public_id}
                      alt={`${i}-slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />{" "}
                <span>{product.reviewsCount} Reviews</span>
              </div>

              <div className="detailsBlock-3">
                <h2>₹{product.price}</h2>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "red" : "green"}>
                    {product.Stock < 2 ? "Out of Stock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description :<p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>

          {product.reviews?.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id}  />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet!</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
