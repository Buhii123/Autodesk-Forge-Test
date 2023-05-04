import { getPublicToken, listObjects } from '../service/apis.js'
export const getTokenAPIs = async (req, res, next) => {
    try {
        res.status(200).json((await getPublicToken()));
    } catch (er) {
        next(er);
    }
}

