"use client";

// Importing axios for making HTTP requests
import axios from "axios";

// Importing react icons for Github and Google
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// Importing react hooks for handling state and form submission
import { useCallback, useState } from "react";

// Importing react - hook - form for form handling
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Importing custom hook for register modal
import useRegisterModal from "@/app/hooks/useRegisterModel";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

// Importing toast for displaying notifications
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  // Using custom hook to get register modal state and onClose function
  const registerModal = useRegisterModal();
  // State to track if the registration is in progress
  const [isLoading, setIsLoading] = useState(false);

  // Using useForm hook to handle form submission and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Submit handler for the registration form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Set isLoading to true to indicate registration is in progress
    setIsLoading(true);

    // Making a POST request to /api/register with the form data
    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        // Set isLoading to false after the request is complete
        setIsLoading(false);
      });
  };

  // JSX for the modal body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // JSX for the modal footer
  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  // Returning the Modal component with the body and footer content
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
