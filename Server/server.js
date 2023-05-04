import express from "express";
import dotenv from 'dotenv';
import authenticationGetTokenRoute from './routes/auth.js'
import modelsRoute from './routes/models.js'

import cors from 'cors';
dotenv.config();
var corsOptions = {
    origin: "*"
}


const app = express();
app.use(cors(corsOptions));
authenticationGetTokenRoute(app);
modelsRoute(app);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Kết nối tới cổng ${PORT} thành công...`);
})