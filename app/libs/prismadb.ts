// Import the Prisma Client from the @prisma/client library
import { PrismaClient } from "@prisma/client";

// Declare a global variable 'prisma' that can be either a PrismaClient instance or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance and assign it to the 'client' variable
const client = globalThis.prisma || new PrismaClient();

// If the NODE_ENV environment variable is not set to 'production',
// assign the 'client' variable to the global 'prisma' variable
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Export the 'client' variable as the default export
export default client;
