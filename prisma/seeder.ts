import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const customers = [
  {
    name: "King Neptune",
    address: "Bikini Neptune",
    phoneNumber: "2871362438",
    paymentInfo: "E Wallet",
  },
  {
    name: "Larry",
    address: "South Bikini Bottom",
    phoneNumber: "3852183662",
    paymentInfo: "Cash",
  },
  {
    name: "Mrs Puff",
    address: "West Bikini Bottom",
    phoneNumber: "9842382638",
    paymentInfo: "Cash",
  },
  {
    name: "Harry",
    address: "East Bikini Bottom",
    phoneNumber: "192352645",
    paymentInfo: "Bank Account",
  },
];

const orders = [
  {
    orderDate: new Date(),
    totalCost: 50540.0,
    paymentMethod: "Cash",
    customerId: 1,
  },
  {
    orderDate: new Date(),
    totalCost: 75000.0,
    paymentMethod: "Credit Card",
    customerId: 2,
  },
];

async function main() {
  // Create customers
  for (const customer of customers) {
    await prisma.customer.create({
      data: customer,
    });
  }

  // Create orders
  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log("Seeder run successfully");
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
