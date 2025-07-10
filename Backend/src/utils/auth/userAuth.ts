// src/utils/auth.ts
import jwt from "jsonwebtoken";
import { pool } from "../../db/pool";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY = "7d";

interface TokenPayload {
    email: string;
    userId: number;
    iat?: number;
    exp?: number;
}

export function createAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
}

export function createRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
}

export async function validateAccessToken(token: string): Promise<TokenPayload | null> {
    try {
        return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    } catch {
        return null;
    }
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
    const res = await pool.query("SELECT 1 FROM token_blacklisted WHERE token = $1", [token]);
    return (res.rowCount ?? 0) > 0;
}


export async function validateRefreshToken(token: string): Promise<TokenPayload | null> {
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) return null;

    try {
        return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch {
        return null;
    }
}

export async function blacklistRefreshToken(token: string): Promise<void> {
    try {
        await pool.query(
            "INSERT INTO token_blacklisted (token) VALUES ($1) ON CONFLICT DO NOTHING",
            [token]
        );
    } catch (err) {
        console.error("Error blacklisting token:", err);
    }

}