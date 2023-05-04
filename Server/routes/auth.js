import { getTokenAPIs } from "../controller/authController.js";
import express from "express";
const route = express.Router();

const authenticationGetTokenRoute = (app) => {
    route.get('/token', getTokenAPIs)
    app.use('/api/auth', route)

}
export default authenticationGetTokenRoute;