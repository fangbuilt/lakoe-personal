import { Badge, Text } from '@chakra-ui/react';

interface StatusBadgeProps {
  status: string;
}

function getStatusBadge({ status }: StatusBadgeProps) {
  let badgeProps: {
    background: string;
    text: string;
    color: string;
  } = {
    background: '',
    text: '',
    color: '',
  };

  if (status?.toUpperCase() === 'UNPAID') {
    badgeProps = {
      background: 'var(--yellow-400, #E8C600)',
      color: `var(--text-dark, #1D1D1D)`,
      text: 'Belum Dibayar',
    };
  } else if (status?.toUpperCase() === 'NEW_ORDER') {
    badgeProps = {
      background: 'var(--green-800, #008F5D)',
      color: `var(--text-light, #FFF)`,
      text: 'Pesanan Baru',
    };
  } else if (status?.toUpperCase() === 'READY_TO_SHIP') {
    badgeProps = {
      background: 'var(--blue-800, #147AF3)',
      color: `var(--text-light, #FFF)`,
      text: 'Siap Dikirim',
    };
  } else if (status?.toUpperCase() === 'IN_TRANSIT') {
    badgeProps = {
      background: 'var(--orange-600, #F68511)',
      color: `var(--text-light, #FFF)`,
      text: 'Dalam Pengiriman',
    };
  } else if (status?.toUpperCase() === 'ORDER_COMPLETED') {
    badgeProps = {
      background: 'var(--gray-200, #E6E6E6)',
      color: `var(--text-dark, #1D1D1D)`,
      text: 'Pesanan Selesai',
    };
  } else if (status?.toUpperCase() === 'ORDER_CANCELLED') {
    badgeProps = {
      background: 'var(--red-800, #EA3829)',
      color: `var(--text-light, #FFF)`,
      text: 'Dibatalkan',
    };
  }

  return (
    <Badge
      display={'flex'}
      height={'24px'}
      padding={`var(--1, 4px) var(--2, 8px)`}
      justifyContent={'center'}
      alignItems={'center'}
      gap={`var(--1, 4px)`}
      borderRadius={`var(--rounded, 4px)`}
      background={badgeProps.background}
      width={'fit-content'}
    >
      <Text
        color={badgeProps.color}
        textAlign={'center'}
        fontSize={'14px'}
        fontWeight={'600'}
        textTransform={'none'}
      >
        {badgeProps.text}
      </Text>
    </Badge>
  );
}

export default getStatusBadge;
