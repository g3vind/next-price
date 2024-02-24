import mongoose from "mongoose";

// tracking connection status
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB URI IS NOT DEFINED");
  }

  if (isConnected) {
    return console.log("=> USING EXISTING DATABASE CONNECTION");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MONGODB CONNECTED 🚀");
  } catch (error) {
    console.error(error);
  }
};
