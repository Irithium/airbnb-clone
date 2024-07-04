import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Favicon from "@/public/images/Metadata/favicon.ico";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";

import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Earthbnb",
  description:
    "This project is an Airbnb clone that I developed to enhance my skills in web development. I utilized Next.js for server-side rendering, Tailwind CSS for styling, and Prisma for database management. The goal was to create a simplified version of Airbnb, focusing on speed and simplicity. Please note that this is not the official Airbnb website; it’s a nonprofit project aimed at learning and practice.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 ">{children}</div>
      </body>
    </html>
  );
}
