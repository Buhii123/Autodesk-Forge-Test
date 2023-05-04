import { modelsGet } from '../controller/modelsController.js'
import express from "express";
const route = express.Router();
const modelsRoute = (app) => {
    route.get('/', modelsGet)
    app.use('/api/models', route)

}
export default modelsRoute 