import instance from '../../utils/axios/axios';


export const verifyRefresh = async () => {
    try {
        console.log("Verifying refresh token...");
        const res = await instance.post('/auth/verify_refresh_token');
        const json = res.data
        return json;
    } catch (error) {
        console.error("login failed", error);
        throw error;
    }
};
