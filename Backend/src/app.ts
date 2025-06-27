import express from 'express'; 
import router from "./router/router";
import cors from 'cors';
// import sessionMiddleware from "./middlewares/session";

const app = express();
app.use(express.json());
app.use(cors())
// app.use(sessionMiddleware)



app.use("/api", router);
app.get("/helloworld",(req,res)=>{
    res.send("Hello World")
})

export default app