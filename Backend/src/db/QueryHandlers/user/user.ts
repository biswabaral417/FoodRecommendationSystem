// src/models/user.ts
import { pool } from "../../pool";
import { loadSQL } from "../../../utils/loadSql";
import { blacklistRefreshToken, createAccessToken, validateAccessToken, validateRefreshToken } from "../../../utils/auth/userAuth";
// import { invalidateJWT, validateJWT } from "../../../utils/auth/userAuth";


const registerSql = loadSQL("../../db/queries/user/registerUser.sql");

export class User {
    constructor(
        public id: number,
        public fname: string,
        public lname: string,
        public email: string,
        public password: string,
        public phone: number,
        public address: string,
        public imageUrl: string,
        public isAdmin: boolean,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }

    static fromRow(row: any): User {
        return new User(
            row.id,
            row.fname,
            row.lname,
            row.email,
            row.password,
            row.phone,
            row.address,
            row.imageurl,
            row.is_admin,
            new Date(row.created_at),
            new Date(row.updated_at)
        );
    }

    static async register(data: UserRegisterParams): Promise<User> {
        const res = await pool.query(registerSql, data);
        return User.fromRow(res.rows[0]);
    }

    static async getByEmail(email: string): Promise<User | null> {
        const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return res.rows.length === 0 ? null : User.fromRow(res.rows[0]);
    }

    static async getByPhone(phone: number): Promise<User | null> {
        const res = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
        return res.rows.length === 0 ? null : User.fromRow(res.rows[0]);
    }

    static async login({ email, phone, password }: userAuthparams): Promise<User | null> {
        let res;
        if (email) {
            res = await pool.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]);
        } else if (phone) {
            res = await pool.query(`SELECT * FROM users WHERE phone = $1 LIMIT 1`, [phone]);
        } else {
            throw new Error("Either email or phone must be provided.");
        }

        if (res.rows.length === 0) return null;

        const foundUser = User.fromRow(res.rows[0]);
        // Use bcrypt for real applications
        if (foundUser.password !== password) return null;

        return foundUser;
    }

    static async authenticate(token: string): Promise<User | null> {
        try {
            const payload = await validateAccessToken(token);
            if (!payload?.email) return null;

            const user = await User.getByEmail(payload.email);
            return user || null;
        } catch (error) {
            console.error('Access token authentication failed:', error);
            return null;
        }
    }

    static async authorize(refreshToken: string): Promise<string> {
        try {
            const payload = await validateRefreshToken(refreshToken);
            if (!payload) throw new Error("Validation failed");
            const user = await User.getByEmail(payload.email);
            if (!user) throw new Error("User not found");

            const newAccessToken = createAccessToken({ email: user.email, userId: user.id });
            return newAccessToken; // Return the new token string
        } catch (error) {
            console.error('Refresh token authorization failed:', error);
            throw new Error("Unknown error");
        }


    }

    static async logout(refreshToken: string): Promise<void> {
        try {
            await blacklistRefreshToken(refreshToken);
        } catch (error) {
            console.error('Logout failed (refresh token invalidation error):', error);
            throw new Error('Logout failed');
        }
    }

    static async findByEmailOrPhone({ email, phone }: { email?: string; phone?: number }): Promise<User | null> {
        if (!email && !phone) return null;

        let existingUser: User | null = null;

        if (email) {
            existingUser = await this.getByEmail(email);
            if (existingUser) return existingUser; // Return early if found by email
        }

        if (phone) {
            existingUser = await this.getByPhone(phone);
        }

        return existingUser;
    }


    static async isAdmin(userId: number): Promise<boolean> {
        const res = await pool.query(`SELECT is_admin FROM users WHERE id = $1`, [userId]);
        return res.rows.length > 0 && res.rows[0].is_admin === true;
    }
}
