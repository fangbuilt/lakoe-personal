import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
  const seedDataPerTable = 5;

  let relationsId = [];
  for (let x = 1; x <= seedDataPerTable; x++) {
    relationsId.push(x.toString());
  }

  // role
  await prisma.role.createMany({
    data: [
      { id: '1', name: 'admin' },
      { id: '2', name: 'seller' },
      { id: '3', name: 'buyer' },
    ],
  });

  // decoration
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.decoration.create({
      data: {
        id: x.toString(),
        type: 'banner ' + x.toString(),
      },
    });
  }

  // store
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.store.create({
      data: {
        id: x.toString(),
        description: 'this is my store ' + x.toString(),
        domain: 'lakoe.store/mystore' + x.toString(),
        name: 'my store ' + x.toString(),
      },
    });
  }

  // user
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.user.create({
      data: {
        id: x.toString(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(relationsId),
        isVerify: false,
        roleId: '2',
      },
    });
  }

  // category
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.category.create({
      data: {
        id: x.toString(),
        name: faker.commerce.department(),
      },
    });
  }

  // message template
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.messageTemplate.create({
      data: {
        id: x.toString(),
        name: 'Template ' + x.toString(),
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // operation hour
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.operationHour.create({
      data: {
        id: x.toString(),
        openAt: '2022-01-01T06:00:00Z',
        closeAt: '2022-01-01T19:00:00Z',
        isOff: false,
        day: faker.helpers.arrayElement([
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ]),
        storeId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // profile
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.profile.create({
      data: {
        id: x.toString(),
        userId: x.toString(),
      },
    });
  }

  // location
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.location.create({
      data: {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(relationsId),
        profileId: faker.helpers.arrayElement(relationsId),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
    });
  }

  // product
  for (let x = 1; x <= seedDataPerTable; x++) {
    const name = faker.commerce.product();
    await prisma.product.create({
      data: {
        id: x.toString(),
        name: name,
        description: faker.commerce.productDescription(),
        minimumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(name) + x.toString(),
        storeId: faker.helpers.arrayElement(relationsId),
        categoryId: faker.helpers.arrayElement(relationsId),
        isActive: faker.helpers.arrayElement([true, false]),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
    });
  }

  // product attachment
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.productAttachment.create({
      data: {
        id: x.toString(),
        productId: faker.helpers.arrayElement(relationsId),
        url: faker.image.url(),
      },
    });
  }

  // variant
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.variant.create({
      data: {
        id: x.toString(),
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // variant option
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.variantOption.create({
      data: {
        id: x.toString(),
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // variant option value
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.variantOptionValue.create({
      data: {
        id: x.toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-' + x.toString(),
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: x.toString(),
      },
    });
  }

  // payment
  await prisma.payment.createMany({
    data: [
      {
        id: '1',
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        bank: 'BCA',
        status: 'UNPAID',
        userId: '1', // just in case buyer can login
      },
      {
        id: '2',
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        bank: 'JAGO',
        status: 'UNPAID',
        userId: '1', // just in case buyer can login
      },
      {
        id: '3',
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        bank: 'DANAMON',
        status: 'UNPAID',
        userId: '1', // just in case buyer can login
      },
      {
        id: '4',
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        bank: 'MANDIRI SYARIAH',
        status: 'UNPAID',
        userId: '1', // just in case buyer can login
      },
      {
        id: '5',
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        bank: 'MANDIRI',
        status: 'UNPAID',
        userId: '1', // just in case buyer can login
      },
    ],
  });

  // cart
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.cart.create({
      data: {
        id: x.toString(),
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // cartItem
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.cartItem.create({
      data: {
        id: faker.string.uuid(),
        cartId: x.toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        qty: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        userId: '1', // just in case buyer can login
        variantOptionId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // courier
  await prisma.courier.createMany({
    data: [
      {
        id: '1',
        availableForCashOnDelivery: faker.helpers.arrayElement([true, false]),
        availableForProofOfDelivery: faker.helpers.arrayElement([true, false]),
        availableForInstantWaybillId: faker.helpers.arrayElement([true, false]),
        courierName: 'Grab',
        courierCode: 'grab',
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: faker.commerce.productDescription(),
        serviceType: 'same_day',
        shippingType: 'parcel',
        shipmentDurationRange: '1 - 3',
        shipmentDurationUnit: 'hours',
        price: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        courierInsurance: faker.helpers.arrayElement(['true', 'false']),
        courierType: 'jne',
        deliveryDate: '2022-01-01T06:00:00Z',
        deliveryTime: '2022-01-01T06:00:00Z',
        orderId: 'orderId-test',
        trackingId: 'trackingId-test',
      },
      {
        id: '2',
        availableForCashOnDelivery: faker.helpers.arrayElement([true, false]),
        availableForProofOfDelivery: faker.helpers.arrayElement([true, false]),
        availableForInstantWaybillId: faker.helpers.arrayElement([true, false]),
        courierName: 'JNE',
        courierCode: 'jne',
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: faker.commerce.productDescription(),
        serviceType: 'same_day',
        shippingType: 'parcel',
        shipmentDurationRange: '1 - 3',
        shipmentDurationUnit: 'hours',
        price: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        courierInsurance: faker.helpers.arrayElement(['true', 'false']),
        courierType: 'jne',
        deliveryDate: '2022-01-01T06:00:00Z',
        deliveryTime: '2022-01-01T06:00:00Z',
        orderId: 'orderId-test',
        trackingId: 'trackingId-test',
      },
      {
        id: '3',
        availableForCashOnDelivery: faker.helpers.arrayElement([true, false]),
        availableForProofOfDelivery: faker.helpers.arrayElement([true, false]),
        availableForInstantWaybillId: faker.helpers.arrayElement([true, false]),
        courierName: 'TIKI',
        courierCode: 'tiki',
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: faker.commerce.productDescription(),
        serviceType: 'same_day',
        shippingType: 'parcel',
        shipmentDurationRange: '1 - 3',
        shipmentDurationUnit: 'hours',
        price: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        courierInsurance: faker.helpers.arrayElement(['true', 'false']),
        courierType: 'jne',
        deliveryDate: '2022-01-01T06:00:00Z',
        deliveryTime: '2022-01-01T06:00:00Z',
        orderId: 'orderId-test',
        trackingId: 'trackingId-test',
      },
      {
        id: '4',
        availableForCashOnDelivery: faker.helpers.arrayElement([true, false]),
        availableForProofOfDelivery: faker.helpers.arrayElement([true, false]),
        availableForInstantWaybillId: faker.helpers.arrayElement([true, false]),
        courierName: 'ShopeeExpress',
        courierCode: 'shopee',
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: faker.commerce.productDescription(),
        serviceType: 'same_day',
        shippingType: 'parcel',
        shipmentDurationRange: '1 - 3',
        shipmentDurationUnit: 'hours',
        price: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        courierInsurance: faker.helpers.arrayElement(['true', 'false']),
        courierType: 'jne',
        deliveryDate: '2022-01-01T06:00:00Z',
        deliveryTime: '2022-01-01T06:00:00Z',
        orderId: 'orderId-test',
        trackingId: 'trackingId-test',
      },

      {
        id: '5',
        availableForCashOnDelivery: faker.helpers.arrayElement([true, false]),
        availableForProofOfDelivery: faker.helpers.arrayElement([true, false]),
        availableForInstantWaybillId: faker.helpers.arrayElement([true, false]),
        courierName: 'tokopediaExpress',
        courierCode: 'tokopedia',
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: faker.commerce.productDescription(),
        serviceType: 'same_day',
        shippingType: 'parcel',
        shipmentDurationRange: '1 - 3',
        shipmentDurationUnit: 'hours',
        price: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        courierInsurance: faker.helpers.arrayElement(['true', 'false']),
        courierType: 'jne',
        deliveryDate: '2022-01-01T06:00:00Z',
        deliveryTime: '2022-01-01T06:00:00Z',
        orderId: 'orderId-test',
        trackingId: 'trackingId-test',
      },
    ],
  });

  // invoice
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.invoice.create({
      data: {
        id: x.toString(),
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.helpers
          .rangeToNumber({
            min: 1000000000,
            max: 9999999999,
          })
          .toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: x.toString(),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
        receiverAddressNote: 'deket tiang listrik',
        receiverPostalCode: '53371',
        receiverEmail: 'surya@gmail.com',
      },
    });
  }

  // bank account
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.bankAccount.create({
      data: {
        id: x.toString(),
        bank: 'MANDIRI',
        accountNumber: faker.finance.accountNumber(),
        accountName: faker.person.fullName(),
        storeId: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // withdraw
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.withdraw.create({
      data: {
        id: x.toString(),
        storeId: faker.helpers.arrayElement(relationsId),
        bankId: faker.helpers.arrayElement(relationsId),
        amount: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
        status: faker.helpers.arrayElement([
          'REQUEST',
          'APPROVED',
          'PROCESSING',
          'SUCCESS',
          'DECLINED',
        ]),
        approvedById: faker.helpers.arrayElement(relationsId),
      },
    });
  }

  // invoice history
  for (let x = 1; x <= seedDataPerTable; x++) {
    await prisma.invoiceHistory.create({
      data: {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(relationsId),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
