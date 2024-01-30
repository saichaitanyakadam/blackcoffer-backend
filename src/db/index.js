import mongoose from "mongoose";
import { dbName } from "../constants/index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbName}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
