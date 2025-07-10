import instance from '../../utils/axios/axios'; // adjust the path as needed

export type SignUpPayload = {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone: string
    image: File | null; // optional image
    address: string
};

export const signUp = async (payload: SignUpPayload): Promise<any> => {
    const formData = new FormData();

    // If image is present, append it
    if (payload.image) {
        formData.append('image', payload.image);
    }

    // Append the rest as a JSON string under 'data'
    const dataToSend = {
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        address: payload.address
    };

    formData.append('data', JSON.stringify(dataToSend));

    const res = await instance.post('/auth/register', formData);

    return res.data;
};
