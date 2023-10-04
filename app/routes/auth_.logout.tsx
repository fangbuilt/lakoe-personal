import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { logout } from '~/modules/auth/auth.service';

export const action = async ({ request }: ActionArgs) => logout(request);

export const loader = async () => redirect('/auth/login');
