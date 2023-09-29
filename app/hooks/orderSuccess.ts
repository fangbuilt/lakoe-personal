// For ECMAScript (ESM)
import MailerLite from '@mailerlite/mailerlite-nodejs';
import type { CreateOrUpdateParams } from '~/interfaces/subcribe';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY as string,
});

export function AutomationMail(email: string, name: string) {
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

  const params: CreateOrUpdateParams = {
    email: `${newEmailAddress}`,
    fields: {
      name: `${name}`,
    },
    groups: ['98537036938479128'],
    status: 'active', // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
    subscribed_at: '2021-08-31 14:22:08',
    ip_address: undefined,
    opted_in_at: undefined, // yyyy-MM-dd HH:mm:ss
    optin_ip: undefined,
    unsubscribed_at: undefined, // yyyy-MM-dd HH:mm:ss
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
