// import express from "express"
// import cors from "cors"
// import { connectDB } from "./config/db.js"
// import routes from "./routes/foodRoutes.js"
// import userRouter from "./routes/userRoute.js"
// import dotenv from "dotenv";
// import router from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"
// dotenv.config();

// //config
// const app=express()
// const port=3000
// //middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(cors())
// //db connection
// connectDB();
// //api endpoints
// app.use('/api/food',routes)
// app.use("/images",express.static('upload'))
// app.use("/api/user",userRouter);
// app.use("/api/cart",router);
// app.use("/api/orders",orderRouter);

// app.get("/",(req,res)=>
// {
//     res.send("api working")
// })
// app.listen(port,()=>
// {
//     console.log(`server is running at http://localhost:${port}`)
// })
// //mongodb+srv://immidisettichatushva:<db_password>@mongo.hswikqa.mongodb.net/?retryWrites=true&w=majority&appName=mongoserver
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import routes from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import {login, refreshToken} from "./controller/authController.js";
dotenv.config();

// config
const app = express();  
const port =  process.env.PORT||3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/food', routes);
app.use("/images", express.static('upload'));
app.use("/image", express.static('upload'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter);
app.post("/api/refresh-token", refreshToken);
app.post("/api/login", login);


 // changed to singular for consistency

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});