import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Biteship } from '~/modules/webhook/biteship.service';

// This is webhook trigger receiver by order status for biteship's webhook
export const action = async ({ request }: ActionArgs) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, 405);
  }

  try {
    const payload = await request.json();
    Biteship(payload);
  } catch (err) {
    return json(err);
  }

  return json({ success: true }, 200);
};
