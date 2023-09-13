import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Image,
  Stack,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from '@remix-run/react';
import BagFilled from '~/assets/icon-pack/bag-filled.svg';
import BagOutline from '~/assets/icon-pack/bag-outline.svg';
import BoxFilled from '~/assets/icon-pack/box-filled.svg';
import BoxOutline from '~/assets/icon-pack/box-outline.svg';
import HomeFilled from '~/assets/icon-pack/home-filled.svg';
import HomeOutline from '~/assets/icon-pack/home-outline.svg';
import SettingFilled from '~/assets/icon-pack/setting-filled.svg';
import SettingOutline from '~/assets/icon-pack/setting-outline.svg';
import ActiveDot from '~/assets/icon-pack/active-dot.svg';
import InactiveDot from '~/assets/icon-pack/inactive-dot.svg';
import ProfileFilled from '~/assets/icon-pack/profile-filled.svg';
import ProfileOutline from '~/assets/icon-pack/profile-outline.svg';

export function LeftNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      direction={'column'}
      h={'100vh'}
      py={4}
      justifyContent={'space-between'}
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
          Produk
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
          py={6}
          onClick={() => navigate('/order')}
          textColor={location.pathname === '/order' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/order' ? 'bold' : 'semibold'}
        >
          Pesanan
        </Button>

        <Accordion
          allowToggle
          defaultIndex={
            location.pathname.startsWith('/configuration') ? [0] : []
          }
        >
          <AccordionItem border={'none'}>
            <AccordionButton
              as={Button}
              justifyContent={'left'}
              leftIcon={
                location.pathname.startsWith('/configuration') ? (
                  <Image src={SettingFilled} />
                ) : (
                  <Image src={SettingOutline} />
                )
              }
              variant={
                location.pathname.startsWith('/configuration')
                  ? 'solid'
                  : 'ghost'
              }
              py={6}
              textColor={
                location.pathname.startsWith('/configuration')
                  ? '#0086B4'
                  : 'unset'
              }
              fontWeight={
                location.pathname.startsWith('/configuration')
                  ? 'bold'
                  : 'semibold'
              }
            >
              Pengaturan
              <AccordionIcon ms={'auto'} />
            </AccordionButton>
            <AccordionPanel px={0}>
              <Stack>
                <Button
                  justifyContent={'left'}
                  leftIcon={
                    location.pathname ===
                    '/configuration/storeConfiguration' ? (
                      <Image src={ActiveDot} />
                    ) : (
                      <Image src={InactiveDot} />
                    )
                  }
                  variant={
                    location.pathname === '/configuration/storeConfiguration'
                      ? 'solid'
                      : 'ghost'
                  }
                  py={5}
                  onClick={() => navigate('/configuration/storeConfiguration')}
                  textColor={
                    location.pathname === '/configuration/storeConfiguration'
                      ? '#0086B4'
                      : 'unset'
                  }
                  fontWeight={
                    location.pathname === '/configuration/storeConfiguration'
                      ? 'medium'
                      : 'normal'
                  }
                >
                  Atur Toko
                </Button>
                <Button
                  justifyContent={'left'}
                  leftIcon={
                    location.pathname === '/configuration/shipment' ? (
                      <Image src={ActiveDot} />
                    ) : (
                      <Image src={InactiveDot} />
                    )
                  }
                  variant={
                    location.pathname === '/configuration/shipment'
                      ? 'solid'
                      : 'ghost'
                  }
                  py={5}
                  onClick={() => navigate('/configuration/shipment')}
                  textColor={
                    location.pathname === '/configuration/shipment'
                      ? '#0086B4'
                      : 'unset'
                  }
                  fontWeight={
                    location.pathname === '/configuration/shipment'
                      ? 'medium'
                      : 'normal'
                  }
                >
                  Pengiriman
                </Button>
                <Button
                  justifyContent={'left'}
                  leftIcon={
                    location.pathname === '/configuration/paymentMethod' ? (
                      <Image src={ActiveDot} />
                    ) : (
                      <Image src={InactiveDot} />
                    )
                  }
                  variant={
                    location.pathname === '/configuration/paymentMethod'
                      ? 'solid'
                      : 'ghost'
                  }
                  py={5}
                  onClick={() => navigate('/configuration/paymentMethod')}
                  textColor={
                    location.pathname === '/configuration/paymentMethod'
                      ? '#0086B4'
                      : 'unset'
                  }
                  fontWeight={
                    location.pathname === '/configuration/paymentMethod'
                      ? 'medium'
                      : 'normal'
                  }
                >
                  Metode Pembayaran
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
