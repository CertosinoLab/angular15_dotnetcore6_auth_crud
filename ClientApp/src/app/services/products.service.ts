import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/entity-models';
import { ProductTable } from '../models/table-models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private httpClient: HttpClient) {
    this.baseUrl = baseUrl + 'api/products';
  }

  async getProducts(): Promise<any> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}`).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getPaginatedProducts(currentPage: number, pageSize: number, orderBy: string, orderDirection: string): Promise<ProductTable> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}/getpaginatedproducts`, {
        params: {
          orderBy,
          orderDirection,
          currentPage: currentPage.toString(),
          pageSize: pageSize.toString()
        }
      }).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addProduct(product: Product): Promise<void> {
    try {
      await this.httpClient.post(`${this.baseUrl}/createproduct`, product).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateProduct(product: Product): Promise<void> {
    try {
      await this.httpClient.put(`${this.baseUrl}/updateproduct/${product.id}`, product).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.httpClient.delete(`${this.baseUrl}/deleteproduct/${productId}`).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
