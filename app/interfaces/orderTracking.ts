export interface IBiteshipTracking {
  id: string;
  success: boolean;
  messsage: string;
  object: string;
  waybill_id: string;
  courier: {
    company: string;
    name: string | null;
    phone: number | null;
  };
  origin: {
    contact_name: string;
    address: string;
  };
  destination: {
    contact_name: string;
    address: string;
  };
  history: {
    note: string;
    updated_at: string;
    status: string;
  };
  link: string | null;
  order_id: string | null;
  status: string;
}
