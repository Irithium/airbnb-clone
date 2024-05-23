"use client";

// Importing necessary components and hooks
import Avatar from "../Avatar"; // Importing the Avatar component
import MenuItem from "./MenuItem"; // Importing the MenuItem component

import { AiOutlineMenu } from "react-icons/ai"; // Importing the AiOutlineMenu icon from react-icons
import { useCallback, useState } from "react"; // Importing useCallback and useState hooks from React

import useRegisterModal from "@/app/hooks/useRegisterModel"; // Importing the useRegisterModal hook
import useLoginModal from "@/app/hooks/useLoginModal"; // Importing the useLoginModal hook
import { signOut } from "next-auth/react"; // Importing the signOut function from next-auth/react

import { SafeUser } from "@/app/types/indext"; // Importing the SafeUser type

// Defining the interface for the UserMenu component's props
interface userMenuProps {
  currentUser?: SafeUser | null;
}

// UserMenu component that displays a user menu with different options based on the current user's authentication status
const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  // Initializing the registerModal and loginModal hooks
  const registerModal = useRegisterModal(); // Initializing the registerModal hook
  const loginModal = useLoginModal(); // Initializing the loginModal hook

  // Initializing a state variable to toggle the user menu's visibility
  const [isOpen, setIsOpen] = useState(false); // Initializing a state variable to toggle the user menu's visibility

  // Defining a function to toggle the user menu's visibility
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Returning the UserMenu component's JSX
  return (
    <div className="relative">
      {/* Displaying the user menu's trigger button and the "Airbnb your home" button */}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-[5px] md:pr-[5px] md:pl-[12px] border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full transition shadow-sm hover:shadow-md cursor-pointer"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {/* Displaying the user menu's content if it's open */}
      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* Displaying different menu items based on the current user's authentication status */}
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Log in" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
