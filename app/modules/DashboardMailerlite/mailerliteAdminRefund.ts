import MailerLite from '@mailerlite/mailerlite-nodejs';

function generateRandomString(lenght: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < lenght; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

function generateRandomEmail(email: string, randomStringLenght: number) {
  const [username, domain] = email.split('@');
  const randomString = generateRandomString(randomStringLenght);
  const randomEmail = `${username}+${randomString}@${domain}`;
  return randomEmail;
}

export interface IDroppingOff {
  email: string;
  fields?: object;
  groups?: Array<string>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

const mailerlite = new MailerLite({
  api_key:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiY2E1MTBjNTk4OGRmOTBmOTAzZGMzMzQ1NmM1ZWJlNDg0YzY4ZDJmNmQ5NGM0ZjhkOGJjMjU0MjM0ZTc5NWY4YmZiMzc4YWE2MjEzODg5M2QiLCJpYXQiOjE2OTQ0ODQwMzAuNzU3NjQxLCJuYmYiOjE2OTQ0ODQwMzAuNzU3NjQzLCJleHAiOjQ4NTAxNTc2MzAuNzUyODY0LCJzdWIiOiI2MTk4MTIiLCJzY29wZXMiOltdfQ.mvZE2jBU23eToQkNsThRrUM5GulsQWmueG9TutONYqUjOyJCwgARo6CWtq9Y3S9GduZU3Qbn6EnkU8RwTeL1eC_7UX3PCp1YYZoWdOp35Z_xfs3EQ9hrpCO_SesPMsI1CUbzfrfYTneMnArfdMhb6s-UTtbEZz8dnQW4ib7kuXsQJW_9hIJbYDs28y9InRLtQMpoEAuyltxcXdk8tSP5W5442yBKUaiDNzm4lvsLDM7QbuGwXSjEfBoEoqGmBGlA1-S-gSsmXzRp-j1Qp3L_68JHh5nSs0zCHOMOefUslPpfzXGMGybAXgYSQSQzkVOgUz4nruHGTlZXIbZ3mOBrso8yaLskNnqUuF-hX6ja3nB2_rlHPQkBi2YgbJ7-ODWKihWFf_-30HdAPjEsqz4YzeJLXlUhv2BbxckdR7Pe8G4_ZeUrRifEfCAPUMXqWbRd2Pr5yncwjusf2lKDqb9eZSpmF8PEpaBesB-eYFt84_wst6zdpuATfNJTRyUviA022qtyS6ddY-Dun9IWIsciOQa-XRZJhLr2aemgOuuvRlizRted1ta-hI46tfAb5W3litHg6TPOtqz59ZLvvmJQ0Te8crHbH6_FPjxOIdyyyUlxCD5D3mmG_ovz9Mig3TRaqrfgIKU4Gf17dccRYoEkRo6ziiQbHy7rTTnXrJLuy9g',
});

export function AdminRefundNotification() {
  const oriEmail = 'muhammadalisyamsi@gmail.com';
  const params: IDroppingOff = {
    email: generateRandomEmail(oriEmail, 10),

    fields: {
      // This is where you can make custom fields variable for email template display
      // We must add field first in our MailerLite dashboard for it to work
    },
    groups: ['100358677497644799'], // This is where you need to categorize which group it should go for email automation trigger
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
