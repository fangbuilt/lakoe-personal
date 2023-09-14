import MailerLite from '@mailerlite/mailerlite-nodejs';
import type { IPickingUp } from '~/interfaces/mailerLite';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY as string,
});

export function UsePickingUp(email: string, name: string, waybill: string) {
  const emailAddress = `${email}`;
  const date = new Date().getTime();
  const username = `${date}`;

  // Split the email address into username and domain
  const atIndex = emailAddress.indexOf('@');
  const usernamePart = emailAddress.slice(0, atIndex);
  const domainPart = emailAddress.slice(atIndex + 1);

  // Create a new email address with a value inserted between username and domain
  const newEmailAddress = `${usernamePart}+${username}@${domainPart}`;

  console.log(newEmailAddress); // Output: john.doe-johndoe-example.com

  const params: IPickingUp = {
    email: `${newEmailAddress}`, // The receiver email's - We will get the email from table invoice userId relation to get the email
    fields: {
      // This is where you can make custom fields variable for email template display
      name: `${name}`,
      waybill: `${waybill}`,
      // address: `${address}`,
    },
    groups: ['98353352732051296'], // This is where you need to categorize which group it should go for email automation trigger
    status: 'active', // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
  };

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data);
    });
}
