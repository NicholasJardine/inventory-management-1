// "use client"
// import { useMemo, useState } from "react"
// import { ExpenseByCategorySummary, useGetExpensesbyCategoryQuery } from "../state/api";
// import Header from "../(components)/Header";
// import { PieChart,Pie, ResponsiveContainer, Cell } from "recharts";


// type AggregatedDataItem = {
//     name:string;
//     color?: string;
//     amount: number;
// }

// type AggregatedData = {
//     [category: string]:AggregatedDataItem;

// }


// const Expenses = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const { data:expensesData,
//             isLoading, 
//             isError} = useGetExpensesbyCategoryQuery();

//             const expenses = useMemo(()=> expensesData ?? [], [expensesData])
//             const classNames = {
//                 label: "block text-sm font-medium text-gray-700",
//                 selectInput: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//             }


//             const parseDate = (dateString: string) => {
//                 const date = new Date(dateString);
//                 return date.toISOString().split("T")[0];
//               };
              
//               const aggregatedData: AggregatedDataItem[] = useMemo(() => {
//                 const filtered: AggregatedData = expenses
//                   .filter((data: ExpenseByCategorySummary) => {
//                     const matchesCategory =
//                       selectedCategory === "All" || data.category === selectedCategory;
//                     const dataDate = parseDate(data.date);
//                     const matchesDate =
//                       !startDate ||
//                       !endDate ||
//                       (dataDate >= startDate && dataDate <= endDate);
//                     return matchesCategory && matchesDate;
//                   })
//                   .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
//                     const amount = parseInt(data.amount, 10);
              
//                     if (!acc[data.category]) {
//                       acc[data.category] = { name: data.category, amount: 0 };
//                       acc[data.category].color = `#${Math.floor(
//                         Math.random() * 16777215
//                       ).toString(16)}`;
//                     }
              
//                     acc[data.category].amount += amount;
//                     return acc;
//                   }, {});
              
//                 return Object.values(filtered);
//               }, [expenses, selectedCategory, startDate, endDate]);
              
              


//             if (isLoading){
//                 return <div className='py-4'>Loading...</div>;
//             } 
        
//             if (isError || !expensesData){
//                 return <div className='text-center text-red-500 py-4'>
//                              Failed to fetch users.
//                         </div>;
//             } 
//   return (
//     <div>
//         <div className="mb-5">
//             <Header name = "Expenses"/>
//             <p className="text-sm text-gray-500">
//                 A visual represenatation of our expenses over time.
//             </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//             <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
//             <h3 className='text-lg font-semibold'>
//                 Filter by Category and Date
//             </h3>
//             <div className="space-y-4">
//                 <div>
//                     <label htmlFor="Category" className={classNames.label}> Category</label>
//                     <select id="category"
//                             name="category"
//                             className={classNames.selectInput}
//                             defaultValue="All"
//                             onChange={(e) => setSelectedCategory(e.target.value)}>
//                                 <option value="">All</option>
//                                 <option value="">Office</option>
//                                 <option value="">Professional</option>
//                                 <option value="">Salaries</option>
//                     </select>
//                 </div>


//                 <div>
//                     <label htmlFor="start-date" className={classNames.label}>Start Date</label>
//                     <input id="start-date"
//                             type="date"
//                             name="start-date"
//                             className={classNames.selectInput}
//                             defaultValue="All"
//                             onChange={(e) => setStartDate(e.target.value)}>
//                     </input>
//                 </div>
                
//                 <div>
//                     <label htmlFor="end-date" className={classNames.label}>End Date</label>
//                     <input id="end-date"
//                             type="date"
//                             name="end-date"
//                             className={classNames.selectInput}
//                             defaultValue="All"
//                             onChange={(e) => setEndDate(e.target.value)}>
//                     </input>
//                 </div>


//             </div>
//             </div>


//             <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
//                 <ResponsiveContainer width="100%" height={400}>
//                     <PieChart>
//                     <Pie
//                         data={aggregatedData}
//                         cx="50%"
//                         cy="50%"
//                         label
//                         outerRadius={150}
//                         fill="#8884d8"
//                         dataKey="amount"
//                         onMouseEnter={(_, index) => setActiveIndex(index)}
//                         />
//                         {aggregatedData.map(
//                             (entry: AggregatedDataItem, index:number) => (
//                                 <Cell key={`cell-${index}`}
//                                 fill={
//                                     index === activeIndex ? "rgb(29,78,216)" : entry.color}
//                                 />
//                             )
//                         )}
//                     </PieChart>
//                 </ResponsiveContainer>

//             </div>

//         </div>
//     </div>

//   )
// }

// export default Expenses





"use client";

import { useMemo, useState } from "react";
import { ExpenseByCategorySummary, useGetExpensesbyCategoryQuery } from "../state/api";
import Header from "../(components)/Header";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: expensesData, isLoading, isError } = useGetExpensesbyCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount, 10);

        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color
          };
        }

        acc[data.category].amount += amount;
        return acc;
      }, {});

    return Object.values(filtered).map((item, index) => ({
      ...item,
      color: item.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Ensure every entry has a color
    }));
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch data.</div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of our expenses over time.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Filters */}
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Filter by Category and Date</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
              </select>
            </div>

            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === activeIndex ? "rgb(29,78,216)" : entry.color || "#8884d8"
                    }
                  />
                ))}
              </Pie>
              <Tooltip/>
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
