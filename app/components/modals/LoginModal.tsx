"use client";

// Importing axios for making HTTP requests
import axios from "axios";

// Importing react icons for Github and Google
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

// Importing react hooks for handling state and form submission
import { useCallback, useState } from "react";
// Importing useRouter from next/navigation for client-side routing
import { useRouter } from "next/navigation";
// Importing react-hook-form for form handling
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// Importing next-auth/react for authentication
import { signIn } from "next-auth/react";
// Importing custom hook for login modal
import useLoginModal from "@/app/hooks/useLoginModal";
// Importing custom hook for register modal
import useRegisterModal from "@/app/hooks/useRegisterModel";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

// Importing toast for displaying notifications
import toast from "react-hot-toast";

const LoginModal = () => {
  // Using useRouter for client-side routing
  const router = useRouter();
  // Using custom hook to get login modal state and onClose function
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // State to track if the login is in progress
  const [isLoading, setIsLoading] = useState(false);

  // Using useForm hook to handle form submission and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler for the login form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Set isLoading to true to indicate login is in progress
    setIsLoading(true);

    // Using next-auth/react for authentication
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      // Set isLoading to false after the request is complete
      setIsLoading(false);
      // Handling successful login
      if (callback?.ok) {
        toast.success("Logged succesfully");
        router.refresh();
        loginModal.onClose();
      }
      // Handling login error
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  // JSX for the modal body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
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
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
