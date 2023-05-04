import { listObjects, urnify } from '../service/apis.js';
export const modelsGet = async (req, res, next) => {
    try {
        const objects = await listObjects();
        res.status(200).json("urn:" + urnify(objects[0].objectId));

    } catch (err) {
        next(err);
    }
}