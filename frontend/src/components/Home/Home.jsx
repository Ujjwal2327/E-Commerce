import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/Metadata";
import { getProduct } from "../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
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
          products && products.map((product) => <Product product={product} key={product._id} />)
        )}
      </div>
    </>
  );
};

export default Home;
