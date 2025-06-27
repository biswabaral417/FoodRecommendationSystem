import { pool } from "../../pool";
import { loadSQL } from "../../../utils/loadSql";


const addQuery = loadSQL("../../db/queries/food/addFood.sql");
const updateQuery = loadSQL("../../db/queries/food/update.sql");
const deleteQuery = loadSQL("../../db/queries/food/delete.sql");
const getQuery = loadSQL("../../db/queries/food/get.sql");
const getAllQuery = loadSQL("../../db/queries/food/getAll.sql");
const getTopOrdered = loadSQL("../../db/queries/food/getTopOrdered.sql");
const getFoodsByWeatherTag = loadSQL("../../db/queries/food/getbyWeatherTags.sql");



export class Food implements FoodItem {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public imageUrl: string,
        public cuisine: string,
        public calories: number,
        public fat: number,
        public protein: number,
        public carbs: number,
        public tags: string[] = [],
        public suitableWeatherTags: string[] = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }

    static fromRow(row: any): Food {
        return new Food(
            row.id,
            row.name,
            row.price,
            row.imageurl,
            row.cuisine,
            row.calories,
            row.fat,
            row.protein,
            row.carbs,
            row.tags || [],
            row.suitable_weather_tags || [],
            new Date(row.created_at),
            new Date(row.updated_at)
        );
    }

    static async add(data: (string | string[] | null | number)[]): Promise<Food> {
        const res = await pool.query(addQuery, data);
        return Food.fromRow(res.rows[0]);
    }

    static async edit(id: number, data: FoodUpdateParams): Promise<Food> {
        const res = await pool.query(updateQuery, data);
        return Food.fromRow(res.rows[0]);
    }

    static async delete(id: number): Promise<Food> {
        const res = await pool.query(deleteQuery, [id]);
        return Food.fromRow(res.rows[0]);
    }

    static async get(id: number): Promise<Food | null> {
        const res = await pool.query(getQuery, [id]);
        if (res.rows.length === 0) return null;
        return Food.fromRow(res.rows[0]);
    }
    static async getAll(): Promise<Food[]> {
        const res = await pool.query(getAllQuery);
        return res.rows.map(Food.fromRow);
    }
    static async getTopOrdered(limit: number = 10): Promise<Food[]> {
        const res = await pool.query(getTopOrdered, [limit]);
        return res.rows.map(Food.fromRow);
    }
    static async getFoodsByWeatherTag(tag: string): Promise<Food[]> {
        const res = await pool.query(getFoodsByWeatherTag, [tag]);
        return res.rows.map(Food.fromRow);
    }
}


