import express from "express";

const app = express();  //create an express app



// import routes
import userRouter from "./routes/user.route.js";

app.use(express.json());
  
// router declaration
app.use("/api/v1/users", userRouter); 

// example route: http://localhost:4000/api/v1/users/register

export default app;