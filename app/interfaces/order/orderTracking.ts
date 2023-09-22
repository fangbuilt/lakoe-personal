export interface ITracking {
  id: string;
  waybill_id: string;
  courier: {
    company: string;
    name: string;
    phone: string;
  };
  destination: {
    contact_name?: string;
    address?: string;
  };
  history?: {
    note: string;
    service_type: string;
    status: string;
    updated_at: string;
  };
  origin: {
    contact_name: string;
    address: string;
  };
  status: string;
  apiKey: string;
}
