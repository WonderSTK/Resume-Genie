import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if(isConnected){
    console.log("Already connected to MongoDB");
    return
  }
  const mongoDBUrl=process.env.MONGODB_URL

  if (!mongoDBUrl) {
    return console.error("MongoDB URL not found");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoDBUrl);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
