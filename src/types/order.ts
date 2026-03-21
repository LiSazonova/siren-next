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

export type PaymentMethod = 'card' | 'paypal' | 'cod'
export type PaymentStatus = 'pending' | 'paid' | 'failed'

export type OrderStatus =
  | 'new'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface Order {
  id: string
  orderNumber: number

  customer: Customer
  items: OrderItem[]

  total: number

  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus

  status: OrderStatus

  deliveryMethod: string
  deliveryCountry: string

  createdAt?: any
}