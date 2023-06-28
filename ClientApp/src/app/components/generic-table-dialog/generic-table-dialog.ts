import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Utils } from "src/app/utils/utils";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CustomersService } from "src/app/services/customers.service";
import { EmployeesService } from "src/app/services/employees.service";
import { ProductsService } from "src/app/services/products.service";
import { Customer, Employee, Order, Product } from "../../models/entity-models";
import { CustomerSearchInput } from "../customer-search-input/customer-search-input";
import { ProductSearchInput } from "../product-search-input/product-search-input";
import { OrdersService } from "../../services/orders.service";

export interface DialogData {
  dialogType: string;
  currentTableType: string;
  column: string;
  objectColumn: any;
}

@Component({
  selector: 'generic-table-dialog',
  templateUrl: 'generic-table-dialog.html',
  styleUrls: ['./generic-table-dialog.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    CustomerSearchInput,
    ProductSearchInput
  ],
})
export class GenericTableDialog implements OnInit{
  selectedOrderCustomerId: number = 0;
  selectedOrderProductId: number = 0;
  objectList: any[] = [];
  customer: Customer = {};
  employee: Employee = {};
  product: Product = {}
  order: Order = {}

  orderDetailsProducts: Product[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenericTableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private customersService: CustomersService,
    private employeeService: EmployeesService,
    private productsService: ProductsService,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    if(this.data.dialogType === 'details') this.objectList = this.getPropertiesWithValue();
    else if(this.data.dialogType === 'edit') this.initializeEditData();
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  formattedColumnName(): string {
    return Utils.formatColumnName(this.data.column);
  }

  getPropertiesWithValue(): { property: string; value: any }[] {
    const properties: { property: string; value: any }[] = [];

    for (const prop in this.data.objectColumn) {
      if (
        this.data.objectColumn.hasOwnProperty(prop) &&
        !Array.isArray(this.data.objectColumn[prop]) &&
        typeof this.data.objectColumn[prop] !== "object" &&
        this.data.objectColumn[prop] !== null
      ) {
        properties.push({
          property: prop,
          value: this.data.objectColumn[prop],
        });
      }
    }

    return properties;
  }

  createCustomer(): void {
    this.customersService.addCustomer(this.customer);
    this.dialogRef.close(true);
  }

  updateCustomer(): void {
    this.customersService.updateCustomer(this.customer);
    this.dialogRef.close(true);
  }

  createEmployee(): void {
    this.employeeService.addEmployee(this.employee);
    this.dialogRef.close(true);
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee);
    this.dialogRef.close(true);
  }

  createProduct(): void {
    this.productsService.addProduct(this.product);
    this.dialogRef.close(true);
  }

  updateProduct(): void {
    this.productsService.updateProduct(this.product);
    this.dialogRef.close(true);
  }

  createOrder(): void {
    this.orderService.addOrder(this.order, this.selectedOrderProductId, this.selectedOrderCustomerId);
    this.dialogRef.close(true);
  }

  updateOrder(): void {
    this.orderService.updateOrder(this.order, this.selectedOrderProductId, this.selectedOrderCustomerId);
    this.dialogRef.close(true);
  }

  setIdCustomer(evt: number): void {
    this.selectedOrderCustomerId = evt;
  }

  setIdProduct(evt: number): void {
    this.selectedOrderProductId = evt;
  }

  initializeEditData(): void {
    if (this.data.currentTableType === 'Customers') {
      this.customer = Object.assign({}, this.data.objectColumn);
    } else if(this.data.currentTableType === 'Employees') {
      this.employee = Object.assign({}, this.data.objectColumn);
    } else if(this.data.currentTableType === 'Products') {
      this.product = Object.assign({}, this.data.objectColumn);
    } else if (this.data.currentTableType === 'Orders') {
      this.order = Object.assign({}, this.data.objectColumn);
    } 
  }
}
