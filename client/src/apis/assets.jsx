import { client } from "./api";

export const createAsset = async (token, form) => {
    return await client.post('/asset', form, {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
}