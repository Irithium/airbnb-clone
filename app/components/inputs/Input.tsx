"use client";

// Importing FieldErrors, FieldValues, and UseFormRegister from react-hook-form for form handling
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// Importing BiDollar icon from react-icons for displaying a dollar sign in the input field
import { BiDollar } from "react-icons/bi";

//Defining the InputProps interface for Input component props
interface InputProps {
  // The id of the input field
  id: string;
  // The label of the input field
  label: string;
  // The type of the input field (optional)
  type?: string;
  // Whether the input field is disabled (optional)
  disabled?: boolean;
  // Whether to format the input field as a price (optional)
  formatPrice?: boolean;
  // Whether the input field is required (optional)
  required?: boolean;
  // The register function from react-hook-form for registering the input field
  register: UseFormRegister<FieldValues>;
  // The errors object from react-hook-form for error handling
  errors: FieldErrors;
}

// Defining the Input component as a functional component
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {
        // Conditionally rendering the BiDollar icon if formatPrice is true
        formatPrice && (
          <BiDollar
            size={24}
            className="text-neutral-700 absolute top-5 left-2"
          />
        )
      }
      <input
        id={id}
        disabled={disabled}
        // Registering the input field using the register function
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={` 
        peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:placeholder-opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? "pl-9" : "pl-4"} 
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
      ${formatPrice ? "left-9" : "left-4"}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
