import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, 
    {useUnifiedTopology: true, useNewUrlParser: true}
  );
  console.log(`Mongo DB Connected: ${conn.connection.host}`);
}

export default connectDB;