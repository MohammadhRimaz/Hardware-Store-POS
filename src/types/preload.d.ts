import { CreateCustomerInput } from "./customer";
import { CreateProductInput } from "./product";

export {};

type IPCResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

declare global {
  interface Window {
    api: {
      createCategory: (name: string) => Promise<IPCResponse<null>>;
      createProduct: (
        payload: CreateProductInput,
      ) => Promise<IPCResponse<null>>;
      createCustomer: (
        payload: CreateCustomerInput,
      ) => Promise<IPCResponse<null>>;
      getCategories: () => Promise<IPCResponse<any[]>>;
      getProducts: () => Promise<IPCResponse<any[]>>;
      getCustomers: () => Promise<IPCResponse<any[]>>;
    };
  }
}
