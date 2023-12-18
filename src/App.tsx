/**
 * The main component of the application.
 * Renders a table with filtered data based on user input.
 */
import React, { useState, useEffect } from "react";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import Table from "./components/Table";
import InputField from "./components/reusableComponets";

interface Order {
  OrderID: number;
  CustomerID: string;
  EmployeeID: number;
  ShipName: string;
  ShipCity: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [filteredData, setFilteredData] = useState<Order[]>([]); // New state to store filtered data
  const [filters, setFilters] = useState({
    OrderID: "",
    CustomerID: "",
    EmployeeID: "",
    ShipName: "",
    ShipCity: "",
  });

  useEffect(() => {
    fetch("https://services.odata.org/V4/Northwind/Northwind.svc/Orders")
      .then((response) => response.json())
      .then((data) => {
        setData(data.value);
        setFilteredData(data.value); // Initialize filteredData with the full data initially
      });
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const keys = Object.keys(filters) as Array<keyof typeof filters>;
      return keys.every((key) => {
        if (!filters[key]) return true;
        return String(item[key])
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });
    setFilteredData(filteredData);
  }, [data, filters]); // Include 'data' as a dependency

  /**
   * Handles the change event of the filter input field.
   * Updates the filters state with the new value.
   * @param event - The change event object
   * @param key - The key of the filter field
   */
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof filters
  ) => {
    const { value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <>
      {Object.keys(filters).map((key) => (
        <InputField
          key={key}
          label={key}
          value={filters[key as keyof typeof filters]}
          onChange={(e) => handleFilterChange(e, key as keyof typeof filters)}
        />
      ))}
      <Table data={filteredData} />
    </>
  );
};

export default App;
