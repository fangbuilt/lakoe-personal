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
import { Form, useLocation, useNavigate } from '@remix-run/react';
import BagFilled from '~/assets/icon-pack/navigation-icons/bag-filled.svg';
import BagOutline from '~/assets/icon-pack/navigation-icons/bag-outline.svg';
import BoxFilled from '~/assets/icon-pack/navigation-icons/box-filled.svg';
import BoxOutline from '~/assets/icon-pack/navigation-icons/box-outline.svg';
import HomeFilled from '~/assets/icon-pack/navigation-icons/home-filled.svg';
import HomeOutline from '~/assets/icon-pack/navigation-icons/home-outline.svg';
import SettingFilled from '~/assets/icon-pack/navigation-icons/setting-filled.svg';
import SettingOutline from '~/assets/icon-pack/navigation-icons/setting-outline.svg';
import ActiveDot from '~/assets/icon-pack/navigation-icons/active-dot.svg';
import InactiveDot from '~/assets/icon-pack/navigation-icons/inactive-dot.svg';
import ProfileFilled from '~/assets/icon-pack/navigation-icons/profile-filled.svg';
import ProfileOutline from '~/assets/icon-pack/navigation-icons/profile-outline.svg';

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
            location.pathname.startsWith('/dashboard') ? (
              <Image src={HomeFilled} />
            ) : (
              <Image src={HomeOutline} />
            )
          }
          variant={
            location.pathname.startsWith('/dashboard') ? 'solid' : 'ghost'
          }
          py={6}
          onClick={() => navigate('/dashboard')}
          textColor={
            location.pathname.startsWith('/dashboard') ? '#0086B4' : 'unset'
          }
          fontWeight={
            location.pathname.startsWith('/dashboard') ? 'bold' : 'semibold'
          }
        >
          Dashboard
        </Button>

        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname.startsWith('/product') ? (
              <Image src={BoxFilled} />
            ) : (
              <Image src={BoxOutline} />
            )
          }
          variant={location.pathname.startsWith('/product') ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/product')}
          textColor={
            location.pathname.startsWith('/product') ? '#0086B4' : 'unset'
          }
          fontWeight={
            location.pathname.startsWith('/product') ? 'bold' : 'semibold'
          }
        >
          Produk
        </Button>

        <Button
          justifyContent={'left'}
          leftIcon={
            location.pathname.startsWith('/order') ? (
              <Image src={BagFilled} />
            ) : (
              <Image src={BagOutline} />
            )
          }
          variant={location.pathname.startsWith('/order') ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/order')}
          textColor={
            location.pathname.startsWith('/order') ? '#0086B4' : 'unset'
          }
          fontWeight={
            location.pathname.startsWith('/order') ? 'bold' : 'semibold'
          }
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
            location.pathname.startsWith('/profile') ? (
              <Image src={ProfileFilled} />
            ) : (
              <Image src={ProfileOutline} />
            )
          }
          variant={location.pathname.startsWith('/profile') ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/profile')}
          textColor={
            location.pathname.startsWith('/profile') ? '#0086B4' : 'unset'
          }
          fontWeight={
            location.pathname.startsWith('/profile') ? 'bold' : 'semibold'
          }
        >
          Profile
        </Button>
        <Form action="/auth/logout" method="post">
          <Button
            bgColor={'lakoeCyan'}
            textColor={'white'}
            _hover={{ textColor: 'black', bgColor: 'gray.200' }}
            borderRadius={'full'}
            type="submit"
            justifyContent={'left'}
            py={6}
          >
            Logout
          </Button>
        </Form>
      </Stack>
    </Flex>
  );
}
