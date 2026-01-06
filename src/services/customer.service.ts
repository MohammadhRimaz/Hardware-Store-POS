import db from "../database/knex";

export async function createCustomer(name: string, contact?: string) {
  return db("customers").insert({ name, contact });
}

export async function getAllCustomers() {
  return db("customers").orderBy("name");
}

export async function updateCustomerDebt(
  customerId: number,
  amountChange: number
) {
  return db("customers")
    .where({ id: customerId })
    .increment("current_debt", amountChange);
}
