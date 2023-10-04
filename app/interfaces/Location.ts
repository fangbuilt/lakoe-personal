export interface ILocation {
  id: string;
  name: string;
  address: string;
  addressNote: string;
  latitude: string;
  longtitude: string;
  postalCode: string;
  cityDistrict: string;
  isMainLocation: boolean;
  storeId?: string;
  profileId?: string;
}
