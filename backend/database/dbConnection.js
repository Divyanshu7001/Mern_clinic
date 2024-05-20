import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "Mernclinic",
    })
    .then(() => {
      console.log("Connected to database!!");
    })
    .catch((err) => {
      console.log(`Error while connecting to databse: ${err}`);
    });
};
