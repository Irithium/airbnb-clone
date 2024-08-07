"use client";

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../Container";
import Categories from "./Categories";

// Importing the SafeUser type from the "@/app/types/indext" module
import { SafeUser } from "@/app/types";

// Defining an interface for the NavbarProps
interface NavbarProps {
  // The currentUser property is an optional SafeUser or null
  currentUser?: SafeUser | null;
}

// Defining a functional component named Navbar
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // Returning a nav element with various styles and children components
  return (
    <nav className="sticky top-0 w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
