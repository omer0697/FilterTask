import React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  Page,
  Edit,
  CommandColumn,
  Filter,
} from '@syncfusion/ej2-react-grids';

interface Order {
  OrderID: number;
  CustomerID: string;
  EmployeeID: number;
  ShipName: string;
  ShipCity: string;
}

interface TableProps {
  data: Order[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div>
      <GridComponent dataSource={data} allowPaging={true} pageSettings={{ pageSize: 6 }}>
        <ColumnsDirective>
          <ColumnDirective field="OrderID" headerText="Order ID" textAlign="Right" />
          <ColumnDirective field="CustomerID" headerText="Customer ID" />
          <ColumnDirective field="EmployeeID" headerText="Employee ID" textAlign="Right" />
          <ColumnDirective field="ShipName" headerText="Ship Name" />
          <ColumnDirective field="ShipCity" headerText="Ship City" />
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Edit, CommandColumn, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Table;
