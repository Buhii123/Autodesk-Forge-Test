import APIS from 'forge-apis';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
let { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET } = process.env;
let internalAuthClient = new APIS.AuthClientTwoLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, ['bucket:read', 'bucket:create', 'data:read', 'data:write', 'data:create'], true);
let publicAuthClient = new APIS.AuthClientTwoLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, ['viewables:read', 'bucket:read', 'bucket:create', 'data:read', 'data:write', 'data:create'], true);

export const getInternalToken = async () => {
    if (!internalAuthClient.isAuthorized()) {
        await internalAuthClient.authenticate();
    }
    return internalAuthClient.getCredentials();
};

export const getPublicToken = async () => {
    if (!publicAuthClient.isAuthorized()) {
        await publicAuthClient.authenticate();
    }
    return publicAuthClient.getCredentials();
};

export const ensureBucketExists = async (bucketKey) => {
    try {

        let a = await new APIS.BucketsApi().getBucketDetails(bucketKey, null, await getPublicToken());
    } catch (err) {
        if (err.response.status === 404) {
            await new APIS.BucketsApi().createBucket({ bucketKey, policyKey: 'temporary' }, {}, null, await getPublicToken());
        } else {
            throw err;
        }
    }

}

export const listObjects = async () => {
    let a = await ensureBucketExists(APS_BUCKET);

    let resp = await new APIS.ObjectsApi().getObjects(
        APS_BUCKET,
        { limit: 64 },
        null,
        await getPublicToken()
    );
    let objects = resp.body.items;
    while (resp.body.next) {

        const startAt = new URL(resp.body.next).searchParams.get('startAt');
        resp = await new APIS.ObjectsApi().getObjects(APS_BUCKET,
            {
                limit: 64,
                startAt
            },
            null,
            await getPublicToken()
        );
        objects = objects.concat(resp.body.items);
    }
    return objects;


}



export let urnify = (id) => Buffer.from(id).toString('base64').replace(/=/g, '');