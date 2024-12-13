import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDashboardMetrics } from "../../../server/src/controllers/dashboardController";
import { getProducts } from "../../../server/src/controllers/productController";
import { getUsers } from "../../../server/src/controllers/userController";
import { getExpensesbyCategory } from "../../../server/src/controllers/expenseController";

export interface Product {
    ProductId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  export interface User {
    UserId: string;
    name: string;
    email: string;
  }
  
export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  
  export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
  }
  
  export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
  }
  

export interface DashboardMetrics{
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];

}
export const api = createApi( {
    baseQuery:fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
           query: ()=> "/dashboard",
           providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search)=> ({url:"/products", params: search ? {search}: {}}),
            providesTags: ["Products"]
         }),
         createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct)=> ({
                url:"/products",
                method: "POST",
                body: newProduct}),
                invalidatesTags: ["Products"]
         }),
         getUsers: build.query<User[], void>({
            query: ()=> '/users',
            providesTags: ["Users"]
         }),
         getExpensesbyCategory: build.query<ExpenseByCategorySummary[], void>({
            query: ()=> '/expenses',
            providesTags: ["Expenses"]
         }),
    }
)
});

export const { 
    useGetDashboardMetricsQuery,
    useGetProductsQuery, useCreateProductMutation, useGetUsersQuery, useGetExpensesbyCategoryQuery
} = api; 
