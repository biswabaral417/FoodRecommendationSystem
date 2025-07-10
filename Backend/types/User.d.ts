interface Userdata {
    id: number,
    fname: string,
    lname: string,
    imageUrl: string,
    phone: string,
    email: string,
    password: string,
    address: string,
    isAdmin?: boolean,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
}

type UserRegisterParams = [
    string, // fname
    string, // lname
    string, // email
    string, // password (should be hashed in prod)
    number, // phone
    string | null, // imageUrl
    string  // address
];

type userAuthparams = {
    email?: string,
    phone?: number
    password: string
}