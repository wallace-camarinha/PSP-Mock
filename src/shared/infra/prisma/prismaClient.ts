import {
  PrismaClient,
  Customer,
  Merchant,
  Order,
  Payable,
} from '@prisma/client';

const prismaClient = new PrismaClient();

export { prismaClient, Customer, Merchant, Order, Payable };
