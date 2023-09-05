'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaTruck } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

interface Props {
  children: React.ReactNode;
}

const Links = [
  'DASHBOARD',
  'PRODUK',
  'ORDERS',
  'LOGISTIK',
  'CHANNELS',
  'LAINNYA',
];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      fontSize={'12px'}
      fontWeight={'bold'}
      color={'gray.500'}
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function NavbarDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={'white'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box
              fontSize={'18px'}
              fontWeight={'bold'}
              color={'blue.500'}
              ml={5}
            >
              Lakoe
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
            <Button
              color={'white'}
              bg={'#8dc63f'}
              size={'sm'}
              ml={2}
              _hover={{ bg: 'blue.500' }}
            >
              Tambahkan Produk
            </Button>
            <Box mr={3} display={'flex'}>
              <Button color={'#00579e'} fontSize={'20px'} p={0} bg={'white'}>
                <IoMdNotifications />
              </Button>
              <Button color={'#00579e'} fontSize={'20px'} p={0} bg={'white'}>
                <FaTruck />
              </Button>
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
            <Button
              color={'white'}
              bg={'#8dc63f'}
              size={'sm'}
              mr={4}
              _hover={{ bg: 'blue.500' }}
            >
              Tambahkan Produk
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
