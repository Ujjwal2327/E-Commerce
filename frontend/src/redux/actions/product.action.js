import axios from "axios"
import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS } from "../constants/product.constant"

export const getProduct = () => async (dispatch) => {

  try{
    dispatch({
      type: ALL_PRODUCTS_REQUEST
    })

    const { data } = await axios.get("/api/v1/products")

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
  }

  catch(error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }

}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}