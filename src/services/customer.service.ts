import db from "../database/knex";
import { CreateCustomerInput } from "../types/customer";

export async function createCustomer(input: CreateCustomerInput) {
  const { name, contact, address, credit_limit = 0 } = input;

  if (!name || !name.trim()) {
    throw new Error("Customer name is required.");
  }
  return db("customers").insert({
    name: name.trim(),
    contact,
    address,
    credit_limit,
    current_debt: 0,
  });
}

export async function getAllCustomers() {
  return db("customers").orderBy("name");
}

export async function updateCustomerDebt(
  customerId: number,
  amountChange: number,
) {
  return db("customers")
    .where({ id: customerId })
    .increment("current_debt", amountChange);
}
