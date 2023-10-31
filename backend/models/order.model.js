import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      pinCode: {
        type: Number,
        required: true
      },
      phoneNo: {
        type: Number,
        required: true
      },
    },
    orderItems: [
      {
        product: {
          // type: mongoose.Schema.Types.ObjectId,
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product"
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        image: {
          type: String,
          required: true
        }
      }
    ],
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User"
    },
    paymentInfo: {
      id: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    },
    paidAt: {
      type: Date,
      required: true
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing"
    },
    deliveredAt: Date,
  },
  { timestamps: true }
)

export const Order = mongoose.model("Order", orderSchema);
