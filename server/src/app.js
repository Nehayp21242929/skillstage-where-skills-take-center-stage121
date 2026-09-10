import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieparser())

//routes import

import userRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
import photoRouter from './routes/photo.routes.js'
import feedbackRouter from "./routes/feedback.routes.js";



// app.use(express.json({limit : "1600kb"}))
// app.use(express.urlencoded({extended : true, limit : "1600kb"}))



//routes declaration
app.use("/api/v1/users", userRouter);

app.use("/api/v1/videos", videoRouter);

app.use("/api/v1/photos", photoRouter);

app.use("/api/v1/feedback", feedbackRouter);

export { app };