"use client";

import React from "react";

import { IconType } from "react-icons";

// Defining an interface for the ButtonProps
interface ButtonProps {
  // The label property is a required string
  label: string;
  // The onClick property is a required function that takes a React MouseEvent as an argument
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // The disabled property is an optional boolean
  disabled?: boolean;
  // The outline property is an optional boolean
  outline?: boolean;
  // The small property is an optional boolean
  small?: boolean;
  // The icon property is an optional IconType
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  // Returning a button element with the specified props and styles
  return (
    <button
      // Adding an onClick event handler
      onClick={onClick}
      // Setting the disabled property
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? "bg-white" : "bg-rose-500"} 
      ${outline ? "border-black" : "border-rose-500"} 
      ${outline ? "text-black" : "text-white"} 
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"} 
      ${small ? "border-[1px]" : "border-2"}`}
    >
      {/* If the icon prop is provided, rendering the Icon component with a size
      of 24 */}
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}

      {label}
    </button>
  );
};

export default Button;
