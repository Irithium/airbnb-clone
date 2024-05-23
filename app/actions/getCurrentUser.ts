// Importing getServerSession function from next-auth/next
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
// Importing Prisma for database operations
import prisma from "@/app/libs/prismadb";

/**
 * Retrieves the current server session
 * returns The current server session
 */
export async function getSession() {
  // Getting the server session using authOptions
  return await getServerSession(authOptions);
}

// Retrieves the current user from the database and returns The current user object or null if not found
export default async function getCurrentUser() {
  try {
    // Get the current server session, this session contains information about the authenticated user
    const session = await getSession();
    // Check if the session has a valid user with an email, if not, return null
    if (!session?.user?.email) {
      return null;
    }
    // Find the user in the database using the email from the session
    const currentUser = await prisma.user.findUnique({
      where: {
        // Using the email from the session to find the user
        email: session.user.email as string,
      },
    });

    // If the user is not found, return null
    if (!currentUser) {
      return null;
    }

    // Return the user object with formatted dates
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(), // Convert createdAt to ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Convert updatedAt to ISO string
      emailVerified: currentUser.emailVerified?.toISOString() || null, // Convert emailVerified to ISO string or null
    };
  } catch (error: any) {
    /**
     * If an error occurs, return null
     */
    return null;
  }
}
