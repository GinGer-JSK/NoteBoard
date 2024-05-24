import express from "express";
import dotenv from "dotenv";
import PostsRouter from "./src/routers/post.router.js";
// import errorHandler from "./src/middlewares/error-handler.middleware";
dotenv.config();

// Express
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", [PostsRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
