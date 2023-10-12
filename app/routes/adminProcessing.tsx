import { Flex } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminProcessing from '~/components/AdminProcessing';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import {
  createAttachmentWithdraw,
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

import { uploadImage } from '~/utils/uploadImage';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '1');

  return await getWithdrawalList();
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();
    const id = formData.get('id');
    const status = formData.get('status');
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

  if (request.method.toLowerCase() === 'post') {
    const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
      if (name !== 'img') {
        return undefined;
      }
      const uploadedImage = await uploadImage(data);
      return uploadedImage.secure_url;
    }, createMemoryUploadHandler());

    try {
      const formData = await parseMultipartFormData(request, uploadHandler);

      const imgSource = formData.get('img') as string;
      const withdrawIdAttachment = formData.get('withdrawId') as string;

      console.log('img url', imgSource);

      if (!imgSource || !withdrawIdAttachment) {
        return json({
          error: 'Something is wrong with the form data',
        });
      }

      const createAttachment = await createAttachmentWithdraw(
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

export default function DasboardAdminProcessing() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'}>
        <AdminProcessing dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
