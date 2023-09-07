import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
  // const seedDataPerTable = 5;

  // role
  await prisma.role.createMany({
    data: [
      { id: '1', name: 'admin' },
      { id: '2', name: 'seller' },
      { id: '3', name: 'buyer' },
    ],
  });

  await prisma.decoration.createMany({
    data: [
      {
        id: '1',
        type: 'banner 1',
      },
      {
        id: '2',
        type: 'banner 2',
      },
      {
        id: '3',
        type: 'banner 3',
      },
      {
        id: '4',
        type: 'banner 4',
      },
      {
        id: '5',
        type: 'banner 5',
      },
    ],
  });

  // store
  await prisma.store.createMany({
    data: [
      {
        id: '1',
        description: 'this is my store1!',
        domain: 'lakoe.store/mystore1',
        name: 'my store 1',
      },
      {
        id: '2',
        description: 'this is my store2!',
        domain: 'lakoe.store/mystore2',
        name: 'my store 2',
      },
      {
        id: '3',
        description: 'this is my store3!',
        domain: 'lakoe.store/mystore3',
        name: 'my store 3',
      },
      {
        id: '4',
        description: 'this is my store4!',
        domain: 'lakoe.store/mystore2',
        name: 'my store 4',
      },
      {
        id: '5',
        description: 'this is my store5!',
        domain: 'lakoe.store/mystore2',
        name: 'my store 5',
      },
    ],
  });

  // user
  await prisma.user.createMany({
    data: [
      {
        id: '1',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        roleId: '2',
      },
      {
        id: '2',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        roleId: '2',
      },
      {
        id: '3',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        roleId: '2',
      },
      {
        id: '4',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        roleId: '2',
      },
      {
        id: '5',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'dumbwayskeren',
        phone: faker.helpers
          .rangeToNumber({ min: 100000000, max: 999999999 })
          .toString(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        roleId: '2',
      },
    ],
  });

  // category
  await prisma.category.createMany({
    data: [
      {
        id: '1',
        name: faker.commerce.department(),
      },
      {
        id: '2',
        name: faker.commerce.department(),
      },
      {
        id: '3',
        name: faker.commerce.department(),
      },
      {
        id: '4',
        name: faker.commerce.department(),
      },
      {
        id: '5',
        name: faker.commerce.department(),
      },
    ],
  });

  // message template
  await prisma.messageTemplate.createMany({
    data: [
      {
        id: '1',
        name: 'Template 1',
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        name: 'Template 2',
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        name: 'Template 3',
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        name: 'Template 4',
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        name: 'Template 5',
        content: faker.lorem.sentence(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // operation hour
  await prisma.operationHour.createMany({
    data: [
      {
        id: '1',
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
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
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
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
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
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
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
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
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
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // profile
  await prisma.profile.createMany({
    data: [
      {
        id: '1',
        userId: '1',
      },
      {
        id: '2',
        userId: '2',
      },
      {
        id: '3',
        userId: '3',
      },
      {
        id: '4',
        userId: '4',
      },
      {
        id: '5',
        userId: '5',
      },
    ],
  });

  // location
  await prisma.location.createMany({
    data: [
      {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        profileId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
      {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        profileId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
      {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        profileId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
      {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        profileId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
      {
        id: faker.string.uuid(),
        name: faker.location.city(),
        address: faker.location.streetAddress(),
        cityDistrict: faker.location.state(),
        isMainLocation: faker.helpers.arrayElement([true, false]),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        profileId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        latitude: faker.location.latitude().toString(),
        longtitude: faker.location.longitude().toString(),
        postalCode: faker.location.zipCode(),
      },
    ],
  });

  // product
  await prisma.product.createMany({
    data: [
      {
        id: '1',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        minumumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        categoryId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        isActive: faker.helpers.arrayElement([true, false]),
      },
      {
        id: '2',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        minumumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        categoryId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        isActive: faker.helpers.arrayElement([true, false]),
      },
      {
        id: '3',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        minumumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        categoryId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        isActive: faker.helpers.arrayElement([true, false]),
      },
      {
        id: '4',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        minumumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        categoryId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        isActive: faker.helpers.arrayElement([true, false]),
      },
      {
        id: '5',
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        minumumOrder: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        slug: faker.helpers.slugify(),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        categoryId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        isActive: faker.helpers.arrayElement([true, false]),
      },
    ],
  });

  // variant
  await prisma.variant.createMany({
    data: [
      {
        id: '1',
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        name: faker.commerce.productMaterial(),
        isActive: faker.helpers.arrayElement([true, false]),
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // variant option
  await prisma.variantOption.createMany({
    data: [
      {
        id: '1',
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        name: faker.commerce.productName(),
        variantId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // variant option value
  await prisma.variantOptionValue.createMany({
    data: [
      {
        id: '1',
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-1',
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-2',
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-3',
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-4',
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        sku: 'SKU-5',
        stock: faker.helpers.rangeToNumber({ min: 0, max: 10000 }),
        weight: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        isActive: faker.helpers.arrayElement([true, false]),
        variantOptionId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // variant option value size
  await prisma.variantOptionValueSize.createMany({
    data: [
      {
        id: faker.string.uuid(),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
      {
        id: faker.string.uuid(),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
      {
        id: faker.string.uuid(),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
      {
        id: faker.string.uuid(),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
      {
        id: faker.string.uuid(),
        height: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        width: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        length: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      },
    ],
  });

  // cart
  await prisma.cart.createMany({
    data: [
      {
        id: '1',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // cartItem
  await prisma.cartItem.createMany({
    data: [
      {
        id: faker.string.uuid(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        qty: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
        productId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

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
      },
    ],
  });

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

  // invoice
  await prisma.invoice.createMany({
    data: [
      {
        id: '1',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.phone.toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
      },
      {
        id: '2',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.phone.toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
      },
      {
        id: '3',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.phone.toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
      },
      {
        id: '4',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.phone.toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
      },
      {
        id: '5',
        discount: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
        invoiceNumber: faker.finance.accountNumber().toString(),
        mootaTransactionId: faker.finance.accountNumber().toString(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 5000000 }),
        receiverName: faker.person.fullName(),
        receiverPhone: faker.phone.toString(),
        receiverAddress: faker.location.streetAddress(),
        receiverDistrict: faker.location.state(),
        receiverLatitude: faker.location.latitude().toString(),
        receiverLongitude: faker.location.longitude().toString(),
        status: 'UNPAID',
        waybill: faker.finance.accountNumber().toString(),
        cartId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        courierId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        paymentId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        userId: '1', // just in case buyer can login
      },
    ],
  });

  // bank account
  await prisma.bankAccount.createMany({
    data: [
      {
        id: '1',
        bank: 'MANDIRI',
        accountNumber: '232342',
        accountName: 'ilham fathullah',
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '2',
        bank: 'BRI',
        accountNumber: '34564723255',
        accountName: 'Cintara Surya',
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '3',
        bank: 'BNI',
        accountNumber: '98349223445',
        accountName: 'Badriana',
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '4',
        bank: 'BCA',
        accountNumber: '7892346528',
        accountName: 'Fajar Rohino',
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: '5',
        bank: 'BCA',
        accountNumber: '278934623',
        accountName: 'Malik Fajar',
        storeId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });

  // invoice history
  await prisma.invoiceHistory.createMany({
    data: [
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
      {
        id: faker.string.uuid(),
        status: faker.helpers.arrayElement([
          'UNPAID',
          'NEW_ORDER',
          'READY_TO_SHIP',
          'IN_TRANSIT',
          'ORDER_COMPLETED',
          'ORDER_CANCELLED',
        ]),
        invoiceId: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
      },
    ],
  });
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
