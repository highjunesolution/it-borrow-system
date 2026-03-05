import { client } from "./api";

export const listDepartments = async () => {
    return client.get('/departments')
}