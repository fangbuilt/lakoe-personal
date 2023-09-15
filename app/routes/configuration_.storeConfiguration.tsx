import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ImplementGrid } from '~/layouts/Grid';
import { Informations } from '~/modules/configuration/components/informations/information';

import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createStoreInformation } from '~/modules/configuration/configuration.service';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log('ini isi dari formData', formData);

  const actionType = formData.get('actionType');
  console.log('ini isi dari actionType', actionType);

  const name = formData.get('name');
  const slogan = formData.get('slogan');
  const description = formData.get('description');
  const domain = `lakoe.store/${name}`;
  const logoAttachment = formData.get('logoAttachment');

  if (actionType === 'create' && name && slogan && description) {
    await createStoreInformation({
      name,
      slogan,
      description,
      domain,
      logoAttachment,
    });
    const redirectURL = `/configuration/store_configuration/ `;
    return redirect(redirectURL);
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
