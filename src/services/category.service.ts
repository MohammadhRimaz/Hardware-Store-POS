import db from "../database/knex";

export async function createCategory(name: string) {
  return db("categories").insert({ name });
}

export async function getAllCategories() {
  return db("categories").select("*").orderBy("name");
}
