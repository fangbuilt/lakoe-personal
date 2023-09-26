/* eslint-disable react-hooks/rules-of-hooks */
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
// import {
//   unstable_composeUploadHandlers as composeUploadHandlers,
//   unstable_createMemoryUploadHandler as createMemoryUploadHandler,
//   unstable_parseMultipartFormData as parseMultipartFormData,
// } from "@remix-run/node";

// import { uploadImage } from "../utils/uploadImage";
import { db } from '~/libs/prisma/db.server';
import { ImplementGrid } from '~/layouts/Grid';
import { Informations } from '~/modules/configuration/components/informations/information';

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();
    const slogan = formData.get('slogan') as string;
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const domain = `lakoe.store/${name}`;
    const logoAttachment = formData.get('logoAttachment') as string;
    console.log('ini logoAttachment', logoAttachment);

    const data = {
      slogan,
      description,
      name,
      domain,
      logoAttachment,
    };

    return await db.store.create({
      data: {
        slogan: data.slogan,
        domain: data.domain,
        name: data.name,
        logoAttachment: data.logoAttachment,
        description: data.description,
      },
    });
  }

  return null;
}

export default function StoreConfiguration() {
  return (
    <ImplementGrid>
      <Flex h={'105vh'} mt={5}>
        <Tabs bg={'white'} mt={5} w={'100%'} borderRadius={5}>
          <Text fontWeight={'bold'} fontSize={'16px'} my={4} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Informasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Lokasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Template Pesan
            </Tab>
          </TabList>

          <TabPanels>
            <Informations />
            <TabPanel>
              <Text>text</Text>
            </TabPanel>

            <TabPanel>
              <p>Ini tugas mas Bani</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
