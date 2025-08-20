import instance from '../utils/axios/axios';

export const test_conn = async () => {
    try {
        // Use GET here to match your backend route
        const res = await instance.get('/test_conn');
        const json = res.data;

        if (json) {
            console.log(json); // logs { success: "connected" }
        }

        return json;
    } catch (error) {
        console.error("Connection error:", error);
        throw error;
    }
};
