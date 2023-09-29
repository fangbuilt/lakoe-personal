import {
  Card,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';
import { ImplementGrid } from '~/layouts/Grid';
import { Informations } from '~/modules/configuration/components/informations/information';
import createLocation, {
  getAllDataLocation,
  getMessages,
  updateMessage,
  deleteMessage,
  createMessage,
  deleteLocation,
  updateLocation,
  getStoreId,
} from '~/modules/configuration/configuration.service';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { updateMessageSchema } from '~/modules/configuration/configuration.schema';
import Locations from '~/modules/configuration/components/location/Locations';
import {
  CreateButton,
  UpdateButton,
  DeleteButton,
} from '~/modules/configuration/components/CrudModal';
import Scroll from '~/modules/configuration/components/Scroll';

export async function loader({ params }: ActionArgs) {
  const getLocationData = await getAllDataLocation();

  const messages = await getMessages();
  const { storeId } = params;
  const store_id = await getStoreId(storeId);

  return { messages, store_id, getLocationData };
}

export async function action({ request }: ActionArgs) {
  // action BAGZA==============================
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
  //==========================================================
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
