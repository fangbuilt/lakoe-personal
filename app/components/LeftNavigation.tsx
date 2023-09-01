import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@remix-run/react';
import BagFilled from '~/assets/icon-pack/bag-filled.svg';
import BagOutline from '~/assets/icon-pack/bag-outline.svg';
import BoxFiled from '~/assets/icon-pack/box-filled.svg';
import BoxOutline from '~/assets/icon-pack/box-outline.svg';
import HomeFilled from '~/assets/icon-pack/home-filled.svg';
import HomeOutline from '~/assets/icon-pack/home-outline.svg';
import SettingFilled from '~/assets/icon-pack/setting-filled.svg';
import SettingOutline from '~/assets/icon-pack/setting-outline.svg';

export function LeftNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex direction={'column'} h={'100vh'} gap={5}>
      <Stack px={5} mt={5}>
        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/dashboard' ? (
              <Image src={HomeFilled} />
            ) : (
              <Image src={HomeOutline} />
            )
          }
          variant={location.pathname === '/dashboard' ? 'solid' : 'ghost'}
          py={7}
          onClick={() => navigate('/dashboard')}
          textColor={location.pathname === '/dashboard' ? '#0086B4' : 'unset'}
        >
          Dashboard
        </Button>
        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/order' ? (
              <Image src={BagFilled} />
            ) : (
              <Image src={BagOutline} />
            )
          }
          variant={location.pathname === '/order' ? 'solid' : 'ghost'}
          py={7}
          onClick={() => navigate('/order')}
          textColor={location.pathname === '/order' ? '#0086B4' : 'unset'}
        >
          Pesanan
        </Button>
        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/product' ? (
              <Image src={BoxFiled} />
            ) : (
              <Image src={BoxOutline} />
            )
          }
          variant={location.pathname === '/product' ? 'solid' : 'ghost'}
          py={7}
          onClick={() => navigate('/product')}
          textColor={location.pathname === '/product' ? '#0086B4' : 'unset'}
        >
          Produk
        </Button>
        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/configuration' ? (
              <Image src={SettingFilled} />
            ) : (
              <Image src={SettingOutline} />
            )
          }
          variant={location.pathname === '/configuration' ? 'solid' : 'ghost'}
          py={7}
          onClick={() => navigate('/configuration')}
          textColor={
            location.pathname === '/configuration' ? '#0086B4' : 'unset'
          }
        >
          Pengaturan
        </Button>
      </Stack>
    </Flex>
  );
}
