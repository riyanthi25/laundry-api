export interface OrderRequestBody {
  customerId: number;
  orderDate: Date;
  totalCost: number;
  paymentMethod: string;
}
