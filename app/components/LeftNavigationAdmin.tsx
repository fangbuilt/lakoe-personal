import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@remix-run/react';

import BoxFilled from '~/assets/icon-pack/box-filled.svg';
import BoxOutline from '~/assets/icon-pack/box-outline.svg';
import HomeFilled from '~/assets/icon-pack/home-filled.svg';
import HomeOutline from '~/assets/icon-pack/home-outline.svg';

import ProfileFilled from '~/assets/icon-pack/profile-filled.svg';
import ProfileOutline from '~/assets/icon-pack/profile-outline.svg';

export function LeftNavigationAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      direction={'column'}
      h={'100vh'}
      py={4}
      justifyContent={'space-between'}
      border={'1px solid grey'}
      padding={'10px'}
      borderRadius={'15px'}
      margin={'10px'}
    >
      <Stack px={4}>
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
          py={6}
          onClick={() => navigate('/dashboard')}
          textColor={location.pathname === '/dashboard' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/dashboard' ? 'bold' : 'semibold'}
        >
          Dashboard
        </Button>

        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/product' ? (
              <Image src={BoxFilled} />
            ) : (
              <Image src={BoxOutline} />
            )
          }
          variant={location.pathname === '/product' ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/product')}
          textColor={location.pathname === '/product' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/product' ? 'bold' : 'semibold'}
        >
          Penarikan Dana
        </Button>
      </Stack>

      <Stack px={4} pb={'7.5vh'}>
        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname === '/profile' ? (
              <Image src={ProfileFilled} />
            ) : (
              <Image src={ProfileOutline} />
            )
          }
          variant={location.pathname === '/profile' ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/profile')}
          textColor={location.pathname === '/profile' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/profile' ? 'bold' : 'semibold'}
        >
          Profile
        </Button>
      </Stack>
    </Flex>
  );
}
