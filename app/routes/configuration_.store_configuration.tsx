import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ImplementGrid } from '~/layouts/Grid';
import Locations from '~/modules/configuration/components/location/Locations';

export default function StoreConfiguration() {
  return (
    <ImplementGrid>
      <Flex h={'100vh'} mt={5}>
        <Tabs bg={'white'} mt={5} w={'100%'} borderRadius={5}>
          <Text fontWeight={'semibold'} fontSize={'16px'} my={4} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Tab textDecoration={'none'}>Informasi</Tab>

            <Tab textDecoration={'none'}>Lokasi</Tab>

            <Tab textDecoration={'none'}>Template Pesan</Tab>
          </TabList>

          <TabPanels>
            {/* INI BAGIAN rifki */}
            <TabPanel>
              <p>information</p>
            </TabPanel>

            {/* INI BAGIAN BAGZA */}
            <Locations />

            {/* INI BAGIAN bani */}
            <TabPanel>
              <p>Template Pesan</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
