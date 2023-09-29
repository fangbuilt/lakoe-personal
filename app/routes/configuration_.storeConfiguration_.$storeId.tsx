import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Stack,
  Card,
} from '@chakra-ui/react';
import { ImplementGrid } from '~/layouts/Grid';
import Locations from '~/modules/configuration/components/location/Locations';
import { Informations } from '~/modules/configuration/components/informations/information';
import createLocation, {
  getAllDataLocation,
  createStoreInformation,
  updateStoreInformation,
  getMessages,
  updateMessage,
  deleteMessage,
  createMessage,
  deleteLocation,
  updateLocation,
  getStoreId,
} from '~/modules/configuration/configuration.service';
import {
  DeleteButton,
  UpdateButton,
  CreateButton,
} from '~/modules/configuration/components/CrudModal';
import type { ActionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Scroll from '~/modules/configuration/components/Scroll';
import { updateMessageSchema } from '~/modules/configuration/configuration.schema';

export async function loader({ params }: ActionArgs) {
  const getLocationData = await getAllDataLocation();

  const messages = await getMessages();
  const { storeId } = params;
  const store_id = await getStoreId(storeId);

  return { messages, store_id, getLocationData };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log('ini isi dari formData', formData);

  const actionType = formData.get('actionType');
  console.log('ini isi dari actionType', actionType);

  const name = formData.get('name');
  const address = formData.get('address');
  const latitude = formData.get('latitude');
  const longtitude = formData.get('longtitude');
  const cityDistrict = formData.get('cityDistrict');
  const postalCode = formData.get('postalCode') as string;
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
    const redirectURL = `/configuration/storeConfiguration/1 `;

    return redirect(redirectURL);
  } else if (actionType === 'deletelocation') {
    const id = formData.get('id') as string;
    await deleteLocation(id);
  } else if (actionType === 'editlocation') {
    console.log('masuk ok!');
    const id = formData.get('id') as string;

    await updateLocation(id, {
      name,
      address,
      latitude,
      longtitude,
      cityDistrict,
      postalCode,
      isMainLocation,
    });
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

  const action = formData.get('action');

  if (action === 'create') {
    const name = formData.get('name') as string;
    const storeId = formData.get('storeId') as string;
    const content = formData.get('content') as string;

    await createMessage(name, storeId, content);
  } else if (action === 'delete') {
    const id = formData.get('id') as string;
    await deleteMessage(id);
  } else if (action === 'update') {
    const id = formData.get('id') as string;
    const name = formData.get('updatedName') as string;
    const content = formData.get('updatedContent') as string;

    const validatedData = updateMessageSchema.parse({ id, name, content });

    await updateMessage(validatedData);
  }

  return null;
}

export default function StoreConfiguration() {
  const data = useLoaderData<typeof loader>();

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
            {/* INI BAGIAN rifki */}
            <Informations />

            {/* INI BAGIAN BAGZA */}
            <Locations />

            {/* INI BAGIAN MIKHAEL DAN HELEN */}
            <TabPanel>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={'16px'}
              >
                <Text fontWeight={'bold'} fontSize={'16px'}>
                  Daftar Template Pesan
                </Text>
                <CreateButton storeId={data.store_id?.id} />
              </Flex>
              <Scroll>
                <Stack spacing="2">
                  {data.messages.map((data, id) => (
                    <Card
                      key={id}
                      borderRadius={'lg'}
                      p={3}
                      pb={2}
                      variant={'outline'}
                    >
                      <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={2}
                      >
                        <Text fontWeight={'bold'} fontSize={'14px'}>
                          {data.name}
                        </Text>
                        <Flex gap={3}>
                          <UpdateButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                          <DeleteButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                        </Flex>
                      </Flex>
                      <Text fontSize={'13px'}>
                        {data.content && (
                          <div
                            dangerouslySetInnerHTML={{ __html: data.content }}
                          />
                        )}
                      </Text>
                    </Card>
                  ))}
                </Stack>
              </Scroll>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
