import express from 'express';
import router from "./router/router";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://food-recommendation-system-pi.vercel.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // allow requests
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));


app.use(cookieParser());
// app.use(sessionMiddleware)   

app.use("/api", router);
app.get("/helloworld", (req, res) => {
    res.send("Hello World")
})


export default app