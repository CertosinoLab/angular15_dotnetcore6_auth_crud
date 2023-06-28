import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderTable } from '../models/table-models';
import { Order, Product } from '../models/entity-models';

interface OrderDTO {
  customerId?: number,
  shippingAddress?: string,
  orderAddress?: string,
  orderEmail?: string,
  orderStatus?: string,
  products?: any[]
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private httpClient: HttpClient) {
    this.baseUrl = baseUrl + 'api/orders';
  }

  async addOrder(order: Order, productId: number, customerId: number): Promise<void> {
    let createOrderDTO: OrderDTO = {
      customerId,
      shippingAddress: order.shippingAddress,
      "orderAddress": "",
      "orderEmail": "",
      orderStatus: order.orderStatus,
      products: [
        {
          productId: productId,
          quantity: 1
        }
      ]
    }

    try {
      await this.httpClient.post(`${this.baseUrl}/createorder`, createOrderDTO).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateOrder(order: Order, productId: number, customerId: number): Promise<void> {
    let createOrderDTO: OrderDTO = {
      customerId,
      shippingAddress: order.shippingAddress,
      "orderAddress": "",
      "orderEmail": "",
      orderStatus: order.orderStatus,
      products: [
        {
          productId: productId,
          quantity: 1
        }
      ]
    }

    try {
      await this.httpClient.post(`${this.baseUrl}/updateorder/${order.id}`, createOrderDTO).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getCustomerOder(orderId: number): Promise<any> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}/ordercustomer/${orderId}`).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getProductsOrder(orderId: number): Promise<any> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}/geproductsdorder/${orderId}`).toPromise();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getPaginatedOrders(currentPage: number, pageSize: number, orderBy: string, orderDirection: string): Promise<OrderTable> {
    try {
      return this.httpClient.get<any>(`${this.baseUrl}/getpaginatedorders`, {
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
}
