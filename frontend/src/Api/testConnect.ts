import instance from '../utils/axios/axios';


export const test_conn = async () => {
    try {
        const res = await instance.post('/test_conn',);
        const json = res.data
        if (json) {
            console.log(json)
        }
        return json;
    } catch (error) {
        console.log("connect error", error);
        throw error;
    }
};
