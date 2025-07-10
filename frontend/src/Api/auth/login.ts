import instance from '../../utils/axios/axios';

type loginPayload = {
    email?: string
    phone?: string
    password: string
};


export const login = async (payload: loginPayload) => {
    try {
        const res = await instance.post('/auth/login', payload);
        const json = res.data
        return json;
    } catch (error) {
        console.error("login failed", error);
        throw error;
    }
};
