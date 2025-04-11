import { address, delivery, order, PrismaClient, product, provider, user, warehouse, warehouseOnAdmin } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users: user[] = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['ADMIN', 'USER']),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
      },
    });
    users.push(user);
    console.log(`Created user with id: ${user.id}`);
  }

  // Seed Addresses
  const addresses: address[] = [];
  for (let i = 0; i < 20; i++) {
    const address = await prisma.address.create({
      data: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        userId: faker.helpers.arrayElement(users).id,
      },
    });
    addresses.push(address);
    console.log(`Created address with id: ${address.id}`);
  }

  // Seed Warehouses
  const warehouses: warehouse[] = [];
  for (let i = 0; i < 5; i++) {
    const warehouse = await prisma.warehouse.create({
      data: {
        capacity: faker.datatype.boolean(),
        addressId: faker.helpers.arrayElement(addresses).id,
      },
    });
    warehouses.push(warehouse);
    console.log(`Created warehouse with id: ${warehouse.id}`);
  }

  // Seed Products
  const products: product[] = [];
  for (let i = 0; i < 15; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        barcode: faker.string.uuid(),
        unitPrice: parseFloat(faker.commerce.price()),
        width: faker.number.float({ min: 1, max: 100 }),
        height: faker.number.float({ min: 1, max: 100 }),
        depth: faker.number.float({ min: 1, max: 100 }),
        Weight: faker.number.float({ min: 1, max: 100 }),
        Expiration: faker.datatype.boolean(),
        ExpirationDate: faker.date.future(),
      },
    });
    products.push(product);
    console.log(`Created product with id: ${product.id}`);
  }

  // Seed Inventory
  for (let i = 0; i < 30; i++) {
    await prisma.inventory.create({
      data: {
        quantity: faker.number.int({ min: 10, max: 1000 }),
        available: faker.datatype.boolean(),
        reorderPoint: faker.number.int({ min: 10, max: 100 }),
        productId: faker.helpers.arrayElement(products).id,
        warehouseId: faker.helpers.arrayElement(warehouses).id,
      },
    });
    console.log(`Created inventory record`);
  }

  // Seed Providers
  const providers: provider[] = [];
  for (let i = 0; i < 5; i++) {
    const provider = await prisma.provider.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      },
    });
    providers.push(provider);
    console.log(`Created provider with id: ${provider.id}`);
  }

  // Seed Orders
  const orders: order[] = [];
  for (let i = 0; i < 10; i++) {
    const order = await prisma.order.create({
      data: {
        orderDate: faker.date.past(),
        providerId: faker.helpers.arrayElement(providers).id,
      },
    });
    orders.push(order);
    console.log(`Created order with id: ${order.id}`);
  }

  // Seed Order Details
  for (let i = 0; i < 20; i++) {
    await prisma.orderDetails.create({
      data: {
        price: parseFloat(faker.commerce.price()),
        shippingCost: parseFloat(faker.commerce.price()),
        OrderQuantity: faker.number.int({ min: 1, max: 100 }),
        ExpectedDate: faker.date.future(),
        orderId: faker.helpers.arrayElement(orders).id,
        productId: faker.helpers.arrayElement(products).id,
        addressId: faker.helpers.arrayElement(addresses).id,
        warehouseId: faker.helpers.arrayElement(warehouses).id,
      },
    });
    console.log(`Created order details record`);
  }

  // Seed Deliveries
  const deliveries: delivery[] = [];
  for (let i = 0; i < 10; i++) {
    const delivery = await prisma.delivery.create({
      data: {
        orderDate: faker.date.past(),
        userId: faker.helpers.arrayElement(users).id,
      },
    });
    deliveries.push(delivery);
    console.log(`Created delivery with id: ${delivery.id}`);
  }

  // Seed Delivery Details
  for (let i = 0; i < 20; i++) {
    await prisma.deliveryDetails.create({
      data: {
        price: parseFloat(faker.commerce.price()),
        shippingCost: parseFloat(faker.commerce.price()),
        OrderQuantity: faker.number.int({ min: 1, max: 100 }),
        ExpectedDate: faker.date.future(),
        productId: faker.helpers.arrayElement(products).id,
        deliveryId: faker.helpers.arrayElement(deliveries).id,
        warehouseId: faker.helpers.arrayElement(warehouses).id,
        addressId: faker.helpers.arrayElement(addresses).id,
      },
    });
    console.log(`Created delivery details record`);
  }

  // Seed WarehouseOnAdmin
  const warehouseOnAdminRecords: warehouseOnAdmin[] = [];
    for (let i = 0; i < 10; i++) {
        const warehouseId = faker.helpers.arrayElement(warehouses).id;
        const userId = faker.helpers.arrayElement(users).id;

        // Check if the combination already exists
        const exists = warehouseOnAdminRecords.some(
            (record) => record.warehouseId === warehouseId && record.userId === userId,
        );

        if (!exists) {
            const warehouseOnAdmin = await prisma.warehouseOnAdmin.create({
            data: {
                warehouseId,
                userId,
            },
            });
            warehouseOnAdminRecords.push(warehouseOnAdmin);
            console.log(`Created warehouseOnAdmin record`);
        } else {
            console.log(`Skipping duplicate warehouseOnAdmin record`);
        }
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });