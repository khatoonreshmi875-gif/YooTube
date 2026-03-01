import mongoose from "mongoose";

const connectDB = async () => {
  console.log("url", process.env.MONGODB_URL, process.env.DB_NAME);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`,
      {
        maxPoolSize: 10,
        minPoolSize: 1, // number of connections in the pool
      },
    );
    console.log(
      `\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host} `,
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
export { connectDB };
