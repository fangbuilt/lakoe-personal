import { Flex } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import {
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import AdminProcessingRefund from '~/components/AdminProcessingRefund';
import { ImplementGridAdminRefund } from '~/layouts/Grid';
import {
  createAttachmentRefund,
  getRefundData,
  updateStatusRefund,
} from '~/modules/dashboard/dashboard.service';

import { uploadImage } from '~/utils/uploadImage';

export async function loader() {
  return await getRefundData();
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();
    const id = formData.get('id');
    const status = formData.get('status');
    try {
      const updateStatus = await updateStatusRefund(
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
      const refundIdAttachment = formData.get('refundId') as string;

      console.log('img url', imgSource);

      if (!imgSource || !refundIdAttachment) {
        return json({
          error: 'Something is wrong with the form data',
        });
      }

      const createAttachment = await createAttachmentRefund(
        imgSource,
        refundIdAttachment
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

  return redirect('/adminSuccessRefund');
}

export default function DasboardAdminProcessingRefund() {
  const dataRefund = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminRefund>
      <Flex h={'100vh'} width={'100%'}>
        <AdminProcessingRefund dataRefund={dataRefund} />
      </Flex>
    </ImplementGridAdminRefund>
  );
}
