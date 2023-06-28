import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeTable } from '../models/table-models';
import { Employee } from '../models/entity-models';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {
    this.baseUrl = baseUrl + 'api/employees';
  }

  async getPaginatedEmployees(
    currentPage: number,
    pageSize: number,
    orderBy: string,
    orderDirection: string
  ): Promise<EmployeeTable> {
    try {
      return this.httpClient
        .get<any>(`${this.baseUrl}/getpaginatedemployees`, {
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

  async addEmployee(employee: Employee): Promise<void> {
    try {
      await this.httpClient
        .post(`${this.baseUrl}/createemployee`, employee)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateEmployee(employee: Employee): Promise<void> {
    try {
      await this.httpClient
        .put(`${this.baseUrl}/updateemployee/${employee.id}`, employee)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteEmployee(employeeId: number): Promise<void> {
    try {
      await this.httpClient
        .delete(`${this.baseUrl}/deleteemployee/${employeeId}`)
        .toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
