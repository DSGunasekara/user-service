import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

import userRoute from "./routes/user.js";

const app = express();

//Database connection
connectDB().then(
    () => console.log("Database Connected...."),
    (error) => console.log(error)
  );
  
  app.use(cors()); //cors added
  app.use(express.json({ extended: false })); //enables json
  
  app.get("/", (req, res) => res.send("API is running"));
  
  app.use("/api/user", userRoute);
  
  const PORT = process.env.PORT || 8070;
  
  //starting app
  app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
  
  export default app;