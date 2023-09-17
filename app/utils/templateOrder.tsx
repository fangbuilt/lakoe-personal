export function createWhatsAppTemplateMessageLink1(
  phoneNumber: string,
  template: string
): string {
  const whatsappBaseUrl = 'https://wa.me/';
  const encodedPhoneNumber = encodeURIComponent(phoneNumber);
  const encodedTemplate = encodeURIComponent(template);
  const whatsappLink = `${whatsappBaseUrl}${encodedPhoneNumber}?text=${encodedTemplate}`;
  return whatsappLink;
}
export const phoneNumber = '+6285776410884';

export function createWhatsAppTemplateMessageUnpaid(
  phone: string,
  template: string
): string {
  const whatsappBaseUrl = 'https://wa.me/';
  const encodedPhoneNumber = encodeURIComponent(phone);
  const encodedTemplate = encodeURIComponent(template);
  const whatsappLink = `${whatsappBaseUrl}${encodedPhoneNumber}?text=${encodedTemplate}`;
  return whatsappLink;
}
