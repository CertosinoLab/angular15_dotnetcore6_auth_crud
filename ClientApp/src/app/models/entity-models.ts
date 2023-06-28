export interface Product {
  id?: number;
  sku?: string;
  name?: string;
  price?: number;
  weight?: number;
  description?: string;
  thumbnail?: string;
  image?: string;
  createDate?: string;
  stock?: number;
  orderDetails?: any[];
  productCategories?: any[];
}

export interface Customer {
  id?: number,
  email?: string,
  password?: string,
  fullName?: string,
  billingAddress?: string,
  defaultShippingAddress?: string,
  country?: string,
  phone?: string,
}

export interface Order {
  id?: number,
  amount?: number,
  shippingAddress?: string,
  orderAddress?: string,
  orderDate?: string,
  orderStatus?: string,
  customer?: Customer
  products?: Product[]
}


export interface Employee {
  id?: number,
  fullName?: string,
  address?: string,
  phone?: string,
  job?: string,
  role?: string,
  salary?: number
}
