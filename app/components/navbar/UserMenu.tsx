"use client";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";

import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";

import { SafeUser } from "@/app/types/indext";

interface userMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
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
      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
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
