"use client"

import React from 'react'
import {useGetUsersQuery } from '../state/api'
import Header from '../(components)/Header'
import { DataGrid, GridColDef } from '@mui/x-data-grid'


const columns: GridColDef[] = [
    {
        field: "userId", headerName: "ID", width: 90
    },
    {
        field: "name", headerName: "Name", width: 200
    },
    {
        field: "email", headerName: "Email", width: 110,
    },
]
const Users = () => {
    const {data:users, isError, isLoading} = useGetUsersQuery();

    if (isLoading){
        return <div className='py-4'>Loading...</div>;
    } 

    if (isError || !users){
        return <div className='text-center text-red-500 py-4'>
                     Failed to fetch users.
                </div>;
    } 


  return (
    <div className='flex flex-col'>
        <Header name = "Users"/>
        <DataGrid rows={users}
        columns={columns} getRowId={(row) => row.userId } checkboxSelection className='bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700'/>
    </div>
  )
}

export default Users



// "use client";

// import React, { useState, useEffect } from "react";
// import { useGetProductsQuery } from "../state/api";
// import Header from "../(components)/Header";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   {
//     field: "ProductId",
//     headerName: "ID",
//     width: 90,
//   },
//   {
//     field: "name",
//     headerName: "Product Name",
//     width: 200,
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 110,
//     type: "number",
//     valueGetter: (value, row) => `$${row.price}`,
//   },
//   {
//     field: "rating",
//     headerName: "Rating",
//     width: 110,
//     type: "number",
//     valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
//   },
//   {
//     field: "stockQuantity",
//     headerName: "Stock Quantity",
//     width: 150,
//     type: "number",
//   },
// ];

// const Inventory = () => {
//   const { data: products, isError, isLoading } = useGetProductsQuery();
//   const [clientRendered, setClientRendered] = useState(false);

//   // Ensure this runs only after hydration
//   useEffect(() => {
//     setClientRendered(true);
//   }, []);

//   if (isLoading) {
//     return <div className="py-4">Loading...</div>;
//   }

//   if (isError || !products) {
//     return (
//       <div className="text-center text-red-500 py-4">
//         Failed to fetch products.
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col">
//       <Header name="inventory" />
//       {clientRendered && (
//         <DataGrid
//           rows={products}
//           columns={columns}
//           getRowId={(row) => row.ProductId}
//           checkboxSelection
//         />
//       )}
//     </div>
//   );
// };

// export default Inventory;
