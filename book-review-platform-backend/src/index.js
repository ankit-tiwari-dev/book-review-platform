import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed error : ", err);
})

export default app;
