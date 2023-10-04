import { z } from 'zod';

export const checkoutSchema = z.object({
  price: z.number(),
  discount: z.number(),
  status: z.string(),
  receiverLongitude: z.string(),
  receiverLattitude: z.string(),
  receiverDistrict: z.string(),
  receiverPhone: z.string(),
  receiverAddress: z.string(),
  receiverName: z.string(),
  invoiceNumber: z.string(),
  waybill: z.string(),
});
