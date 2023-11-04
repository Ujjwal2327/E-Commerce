import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/Metadata";
import { clearErrors, getProducts } from "../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch,error]);

  return (
    <div className="home">
      <MetaData title="CartXpress | Home" />

      <div className="banner">
        <p>Welcome to CartXpress</p>
        <h2>Where you can find all your favorite products</h2>

        <a href="#container">
          <button>
            Shop Now
            <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="heading">Featured Products</h2>

      <div className="container" id="container">
        {loading ? (
          <Loader/>
        ) : (
          products && products.map((product) => <ProductCard product={product} key={product._id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
