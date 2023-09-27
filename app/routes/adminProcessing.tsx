import { Flex } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import {
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminProcessing from '~/components/AdminProcessing';
import { ImplementGridAdmin } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import {
  createAttachmentAdmin,
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

import { uploadImage } from '~/utils/uploadImage';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (role?.roleId === '1') {
    return await getWithdrawalList();
  } else if (role?.roleId === '2') {
    return redirect('/dashboard');
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const status = formData.get('status');
  const actionType = formData.get('actionType');

  if (request.method.toLowerCase() === 'patch') {
    try {
      const updateStatus = await updateStatusWithdraw(
        id as string,
        status as string
      );
      console.log('Status updated successfully:', updateStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  if (actionType === 'create') {
    const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
      if (name !== 'attachment') {
        return undefined;
      }
      const uploadedImage = await uploadImage(data);
      return uploadedImage.secure_url;
    }, createMemoryUploadHandler());

    try {
      const formData = await parseMultipartFormData(request, uploadHandler);

      const imgSource = formData.get('attachment') as string;
      const withdrawIdAttachment = formData.get('withdrawId') as string;

      console.log('img url', imgSource);

      if (!imgSource || !withdrawIdAttachment) {
        return json({
          error: 'Something is wrong with the form data',
        });
      }

      const createAttachment = await createAttachmentAdmin(
        imgSource,
        withdrawIdAttachment
      );

      console.log('berhasil upload', createAttachment);

      return json({
        success: 'Image uploaded and database entry created successfully',
        createAttachment,
      });
    } catch (error) {
      console.error('Error coiii:', error);

      return json({
        error: 'Error creating database entry',
      });
    }
  }

  return redirect('/adminSuccess');
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const status = formData.get('status');
  const actionType = formData.get('actionType');

  if (actionType === 'update' && status) {
    try {
      const updateStatus = await updateStatusWithdraw(
        id as string,
        status as string
      ); // Pass both id and status
      console.log('Status updated successfully:', updateStatus);
      // Handle success
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
  return redirect('/adminProcessing');
}

export default function DasboardAdminProcessing() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex h={'100vh'} width={'100%'}>
        <AdminProcessing dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdmin>
  );
}
