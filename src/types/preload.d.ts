export {};

declare global {
  interface Window {
    api: {
      createCategory: (name: string) => Promise<boolean>;
      getCategories: () => Promise<any[]>;
      getProducts: () => Promise<any[]>;
      getCustomers: () => Promise<any[]>;
    };
  }
}
