import express from "express";

const app = express();  //create an express app



// import routes
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

app.use(express.json());
  
// router declaration
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/posts", postRouter); 

// example route: http://localhost:4000/api/v1/users/register
// example post route: http://localhost:4000/api/v1/posts/create

export default app;