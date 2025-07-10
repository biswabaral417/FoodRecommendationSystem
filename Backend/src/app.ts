import express from 'express';
import router from "./router/router";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true                // Allow credentials (cookies) to be sent
}))

app.use(cookieParser());
// app.use(sessionMiddleware)

app.use("/api", router);
app.get("/helloworld", (req, res) => {
    res.send("Hello World")
})


export default app