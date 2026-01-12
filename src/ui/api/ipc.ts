type IPCResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function unwrap<T>(response: IPCResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
}

export const ipc = {
  async getCategories() {
    const res = await window.api.getCategories();
    return unwrap(res);
  },

  async getProducts() {
    const res = await window.api.getProducts();
    return unwrap(res);
  },
  async getCustomers() {
    const res = await window.api.getCustomers();
    return unwrap(res);
  },
  async createCategory(name: string) {
    const res = await window.api.createCategory(name);
    unwrap(res);
  },
};
