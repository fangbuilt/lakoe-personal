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
import BoxFiled from '~/assets/icon-pack/box-filled.svg';
import BoxOutline from '~/assets/icon-pack/box-outline.svg';
import HomeFilled from '~/assets/icon-pack/home-filled.svg';
import HomeOutline from '~/assets/icon-pack/home-outline.svg';
import SettingFilled from '~/assets/icon-pack/setting-filled.svg';
import SettingOutline from '~/assets/icon-pack/setting-outline.svg';
import ActiveDot from '~/assets/icon-pack/active-dot.svg';
import InactiveDot from '~/assets/icon-pack/inactive-dot.svg';

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
              py={7}
              textColor={
                location.pathname.startsWith('/configuration')
                  ? '#0086B4'
                  : 'unset'
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
                    '/configuration/store_configuration' ? (
                      <Image src={ActiveDot} />
                    ) : (
                      <Image src={InactiveDot} />
                    )
                  }
                  variant={
                    location.pathname === '/configuration/store_configuration'
                      ? 'solid'
                      : 'ghost'
                  }
                  py={7}
                  onClick={() => navigate('/configuration/store_configuration')}
                  textColor={
                    location.pathname === '/configuration/store_configuration'
                      ? '#0086B4'
                      : 'unset'
                  }
                >
                  Pengaturan Toko
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
                  py={7}
                  onClick={() => navigate('/configuration/shipment')}
                  textColor={
                    location.pathname === '/configuration/shipment'
                      ? '#0086B4'
                      : 'unset'
                  }
                >
                  Pengiriman
                </Button>
                <Button
                  justifyContent={'left'}
                  leftIcon={
                    location.pathname === '/configuration/payment_method' ? (
                      <Image src={ActiveDot} />
                    ) : (
                      <Image src={InactiveDot} />
                    )
                  }
                  variant={
                    location.pathname === '/configuration/payment_method'
                      ? 'solid'
                      : 'ghost'
                  }
                  py={7}
                  onClick={() => navigate('/configuration/payment_method')}
                  textColor={
                    location.pathname === '/configuration/payment_method'
                      ? '#0086B4'
                      : 'unset'
                  }
                >
                  Metode Pembayaran
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Flex>
  );
}
