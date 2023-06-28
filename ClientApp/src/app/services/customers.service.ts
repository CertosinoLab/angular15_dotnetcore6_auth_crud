import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerTable } from '../models/table-models';
import { Customer } from '../models/entity-models';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {
    this.baseUrl = baseUrl + 'api/customers';
  }

  async getCustomers(): Promise<any> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}`).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getPaginatedCustomers(
    currentPage: number,
    pageSize: number,
    orderBy: string,
    orderDirection: string
  ): Promise<CustomerTable> {
    try {
      return this.httpClient
        .get<any>(`${this.baseUrl}/getpaginatedcustomers`, {
          params: {
            orderBy,
            orderDirection,
            currentPage: currentPage.toString(),
            pageSize: pageSize.toString()
          }
        })
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addCustomer(customer: Customer): Promise<void> {
    try {
      await this.httpClient
        .post(`${this.baseUrl}/createcustomer`, customer)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateCustomer(customer: Customer): Promise<void> {
    try {
      await this.httpClient
        .put(`${this.baseUrl}/updatecustomer/${customer.id}`, customer)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteCustomer(customerId: number): Promise<void> {
    try {
      await this.httpClient
        .delete(`${this.baseUrl}/deletecustomer/${customerId}`)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
