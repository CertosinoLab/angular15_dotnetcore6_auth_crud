import { Customer, Employee, Order, Product } from "./entity-models";
export interface GenericTableResults {
  [x: string]: any;
  Records: any[],
  CurrentPage: number,
  PageSize: number,
  TotalPages: number,
  TotalCount: number,
  RecordFrom: number,
  RecordTo: number
}

export interface ProductTable {
  Products: Product[],
  CurrentPage: number,
  PageSize: number,
  TotalPages: number,
  TotalCount: number,
  ProductFrom: number,
  ProductTo: number
}

export interface CustomerTable {
  Customers: Customer[],
  CurrentPage: number,
  PageSize: number,
  TotalPages: number,
  TotalCount: number,
  CustomerFrom: number,
  CustomerTo: number
}

export interface OrderTable {
  Orders: Order[],
  CurrentPage: number,
  PageSize: number,
  TotalPages: number,
  TotalCount: number,
  OrderFrom: number,
  OrderTo: number
}

export interface EmployeeTable {
  Employees: Employee[],
  CurrentPage: number,
  PageSize: number,
  TotalPages: number,
  TotalCount: number,
  EmployeeFrom: number,
  EmployeeTo: number
}
