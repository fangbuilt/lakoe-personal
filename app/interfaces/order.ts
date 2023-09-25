export interface IOrderList {
  id: number;
  title: string;
  telephone: string;
  invoice: string;
  totalAmount: number;
  imageProduct: string;
}

export interface IOrderData {
  shipper_contact_name: string;
  shipper_contact_phone: number;
  shipper_contact_email: string;
  shipper_organization: string;
  origin_contact_name: string;
  origin_contact_phone: number;
  origin_address: string;
  origin_note: string;
  origin_postal_code: number;
  destination_contact_name: string;
  destination_contact_phone: number;
  destination_contact_email: string;
  destination_address: string;
  destination_postal_code: number;
  destination_note: string;
  destination_cash_proof_of_delivery: boolean;
  courierName: string;
  courierService: string;
  courier_insurance: number;
  delivery_type: string;
  delivery_date: Date;
  delivery_time: Date;
  order_note?: string;
  id: number;
  name: string;
  image: string;
  description: string;
  value: number;
  quantity: number;
  height: number;
  length: number;
  weight: number;
  width: number;
}
export interface IMessageTemplates {
  id: number;
  message: string;
}
