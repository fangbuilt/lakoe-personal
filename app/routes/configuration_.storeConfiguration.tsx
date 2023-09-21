/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { ImplementGrid } from '~/layouts/Grid';
import Locations from '~/modules/configuration/components/location/Locations';
import { Informations } from '~/modules/configuration/components/informations/information';
import createLocation, {
  getAllDataLocation,
  createStoreInformation,
  updateStoreInformation,
} from '~/modules/configuration/configuration.service';

export async function loader() {
  return await getAllDataLocation();
}

export async function action({ request }: ActionArgs) {
  //ini adalah action location ===============================================
  const formData = await request.formData();
  console.log('ini isi dari formData', formData);

  const actionType = formData.get('actionType');
  console.log('ini isi dari actionType', actionType);

  const name = formData.get('name');
  const address = formData.get('address');
  const latitude = formData.get('latitude');
  const longtitude = formData.get('longtitude');
  const cityDistrict = formData.get('cityDistrict');
  const postalCode = formData.get('postalCode');
  const isMainLocation = true;
  console.log('ini isi dari name :', name);
  console.log('ini isi dari adres :', address);
  console.log('ini isi dari lat :', latitude);
  console.log('ini isi dari long :', longtitude);
  console.log('ini isi dari city :', cityDistrict);
  console.log('ini isi dari poscode :', postalCode);
  console.log('ini isi dari isman :', isMainLocation);

  //ini action rifki===========================
  const nameStore = formData.get('namestore');
  const slogan = formData.get('slogan');
  const description = formData.get('description');
  const domain = `lakoe.store/${name}`;
  const logoAttachment = formData.get('logoAttachment');

  if (actionType === 'createlocation') {
    console.log('data berhasil masuk!');

    await createLocation({
      name,
      address,
      latitude,
      longtitude,
      cityDistrict,
      postalCode,
      isMainLocation,
    });
    const redirectURL = `/configuration/storeConfiguration `;

    return redirect(redirectURL);
  }

  //=======================================================================

  if (actionType === 'createinformation') {
    const storeId = '';
    if (storeId) {
      await updateStoreInformation(storeId, {
        storeId: storeId,
        name: nameStore,
        slogan,
        description,
        domain,
        logoAttachment,
      });
    } else {
      await createStoreInformation({
        name: nameStore,
        slogan,
        description,
        domain,
        logoAttachment,
      });
    }
    const redirectURL = `/configuration/storeConfiguration/ `;
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

            <Locations />

            <TabPanel>
              <Text>hi</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
