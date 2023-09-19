export interface IPickingUp {
  email: string;
  fields?: object;
  groups?: Array<string>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

export interface IInputDroppingOff {
  email: string;
  name: string;
  waybill: string;
}
