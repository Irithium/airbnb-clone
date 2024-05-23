// Importing bcrypt for password hashing
import bcrypt from "bcrypt";
// Importing Prisma for database operations
import prisma from "@/app/libs/prismadb";
// Importing NextResponse for server-side rendering
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(request: Request) {
  // Extract request body
  const body = await request.json();
  // Destructure email, name, and password from the request body
  const { email, name, password } = body;
  // Hash the password using bcrypt with a salt of 12
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user in the database using Prisma
  const user = await prisma.user.create({
    data: {
      email, // User's email
      name, // User's name
      hashedPassword, // Hashed password for security
    },
  });

  // Return the created user as JSON
  return NextResponse.json(user);
}
