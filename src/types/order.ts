export interface OrderItem {
  productId: string
  name: string
  size: string
  price: number
  qty?: number
}

export interface Customer {
  name: string
  email: string
  phone: string
  address: string
}

export interface Order {
  id: string
  orderNumber: number
  customer: Customer
  items: OrderItem[]
  total: number
  status?: string
  createdAt?: any
}