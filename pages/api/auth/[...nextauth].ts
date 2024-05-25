import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

// Define the authentication options for NextAuth
export const authOptions: AuthOptions = {
  // Use the PrismaAdapter to connect to the Prisma database
  adapter: PrismaAdapter(prisma),
  // Define the authentication providers
  providers: [
    // Use the GitHub provider for authentication
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Use the Google provider for authentication
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Use the CredentialsProvider for email/password authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      // Define the authorize function for email/password authentication
      async authorize(credentials) {
        // Check if the email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find the user with the provided email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if the user exists and has a hashed password
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Compare the provided password with the hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Check if the password is correct
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Return the user if the password is correct
        return user;
      },
    }),
  ],
  // Define the sign-in page
  pages: {
    signIn: "/",
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
  // Use JWT for session strategy
  session: {
    strategy: "jwt",
  },
  // Define the secret for JWT
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn(params) {
      // Check if the user already exists

      const existingUser = await prisma.user.findUnique({
        where: {
          email:
            params.user.email !== null && params.user.email !== undefined
              ? params.user.email
              : undefined,
        },
      });

      if (existingUser?.image === null) return true;

      if (existingUser) {
        // If the user already exists, update their information
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            image: params.profile?.avatar_url,
          },
        });
      }

      // Allow the sign-in
      return true;
    },
  },
};

// Export the NextAuth function with the authentication options
export default NextAuth(authOptions);
