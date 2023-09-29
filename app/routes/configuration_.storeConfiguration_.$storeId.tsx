import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import { Informations } from '~/modules/configuration/components/informations/information';
import createLocation, {
  createStoreInformation,
  deleteLocation,
  getAllDataLocation,
  getMessages,
  getStoreid,
  updateStoreInformation,
} from '~/modules/configuration/configuration.service';

export async function loader({ request, params }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

  const getLocationData = await getAllDataLocation();

  //console.log("ini getdata:", getLocationData);

  const messages = await getMessages();
  const { storeId } = params;
  const store_id = await getStoreid(storeId);

  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (role?.roleId === '1') {
    return redirect('/dashboardAdmin');
  } else if (role?.roleId === '2') {
    return { messages, store_id, getLocationData };
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
}

export async function action({ request }: ActionArgs) {
  //ini adalah action location ===============================================
  const formData = await request.formData();
  console.log('ini isi dari formData', formData);
  const storeId = '1';
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
    const redirectURL = `/configuration/storeConfiguration/${storeId} `;

    return redirect(redirectURL);
  } else if (actionType === 'deletelocation') {
    const id = formData.get('id') as string;
    await deleteLocation(id);
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
    const redirectURL = `/configuration/storeConfiguration/1 `;
    return redirect(redirectURL);
  }

  //==================================================================

  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();
    const slogan = formData.get('slogan') as string;
    const name = formData.get('name') as string;
    const domain = `lakoe.store/${name}`;
    const description = formData.get('description') as string;
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
