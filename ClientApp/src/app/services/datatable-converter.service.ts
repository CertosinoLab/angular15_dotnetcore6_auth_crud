import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { CustomersService } from './customers.service';
import { OrdersService } from './orders.service';
import { EmployeesService } from './employees.service';
import { GenericTableResults } from '../models/table-models';

@Injectable({
  providedIn: 'root'
})
export class DatatableConverterService {
  convertedResult: GenericTableResults = {
    CurrentPage: 0,
    PageSize: 0,
    RecordFrom: 0,
    RecordTo: 0,
    Records: [],
    TotalCount: 0,
    TotalPages: 0
  }

  constructor(private productsService: ProductsService, private ordersService: OrdersService,
     private customersService: CustomersService, private employeesService: EmployeesService) { }

  async dataConverter(tableType: string, currentPage: number, pageSize: number,
     orderBy: string, orderDirection: string): Promise<GenericTableResults> {
    if(tableType === 'Products') {
     await this.productsService.getPaginatedProducts(currentPage, pageSize, orderBy, orderDirection).then((data) => {
        this.convertedResult.Records = data.Products;
        this.convertedResult.RecordFrom = data.ProductFrom;
        this.convertedResult.RecordTo = data.ProductTo;
        this.convertedResult.CurrentPage = data.CurrentPage;
        this.convertedResult.TotalCount = data.TotalCount;
        this.convertedResult.TotalPages = data.TotalPages;
        this.convertedResult.PageSize = data.PageSize;
     });
    }
    if(tableType === 'Customers') {
      await this.customersService.getPaginatedCustomers(currentPage, pageSize, orderBy, orderDirection).then((data) => {
         this.convertedResult.Records = data.Customers;
         this.convertedResult.RecordFrom = data.CustomerFrom;
         this.convertedResult.RecordTo = data.CustomerTo;
         this.convertedResult.CurrentPage = data.CurrentPage;
         this.convertedResult.TotalCount = data.TotalCount;
         this.convertedResult.TotalPages = data.TotalPages;
         this.convertedResult.PageSize = data.PageSize;
      });
     }
     if(tableType === 'Orders') {
      await this.ordersService.getPaginatedOrders(currentPage, pageSize, orderBy, orderDirection).then((data) => {
         this.convertedResult.Records = data.Orders;
         this.convertedResult.RecordFrom = data.OrderFrom;
         this.convertedResult.RecordTo = data.OrderTo;
         this.convertedResult.CurrentPage = data.CurrentPage;
         this.convertedResult.TotalCount = data.TotalCount;
         this.convertedResult.TotalPages = data.TotalPages;
         this.convertedResult.PageSize = data.PageSize;
      });
     }
     if(tableType === 'Employees') {
      await this.employeesService.getPaginatedEmployees(currentPage, pageSize, orderBy, orderDirection).then((data) => {
         this.convertedResult.Records = data.Employees;
         this.convertedResult.RecordFrom = data.EmployeeFrom;
         this.convertedResult.RecordTo = data.EmployeeTo;
         this.convertedResult.CurrentPage = data.CurrentPage;
         this.convertedResult.TotalCount = data.TotalCount;
         this.convertedResult.TotalPages = data.TotalPages;
         this.convertedResult.PageSize = data.PageSize;
      });
     }

    return this.convertedResult;
  }

  async deleteOperation(tableType: string, recordId: number) {
    if(tableType === 'Customers') {
      this.customersService.deleteCustomer(recordId);
    }
    if(tableType === 'Employees') {
      this.employeesService.deleteEmployee(recordId);
    }
    if(tableType === 'Products') {
      this.productsService.deleteProduct(recordId);
    }
  }
}
