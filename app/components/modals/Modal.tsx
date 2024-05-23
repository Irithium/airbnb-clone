"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

// Interface for Modal component props
interface ModalProps {
  // Whether the modal is open or not
  isOpen?: boolean;
  // Callback function to close the modal
  onClose: () => void;
  // Callback function to submit the modal
  onSubmit: () => void;
  // Title of the modal
  title?: string;
  // Body content of the modal
  body?: React.ReactElement;
  // Footer content of the modal
  footer?: React.ReactElement;
  // Label for the primary action button
  actionLabel: string;
  // Whether the modal is disabled or not
  disabled?: boolean;
  // Callback function for secondary action
  secondaryAction?: () => void;
  // Label for the secondary action button
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  // State to track whether the modal is open or not
  const [showModal, setShowModal] = useState(isOpen);
  // Update the showModal state when isOpen prop changes
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  // Callback function to handle closing the modal
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    // Set showModal to false and call onClose callback after a delay
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  // Callback function to handle submitting the modal
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    // Call onSubmit callback
    onSubmit();
  }, [disabled, onSubmit]);

  // Callback function to handle secondary action
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    // Call secondaryAction callback
    secondaryAction();
  }, [disabled, secondaryAction]);

  // If isOpen is false, return null
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        {" "}
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
          ${showModal ? "translate-y-0" : "translate-y-full"} ${
              showModal ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <header className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </header>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
