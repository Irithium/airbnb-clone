import { create } from "zustand";

// Define the interface for the LoginModalStore
interface LoginModalStore {
  // A boolean indicating whether the login modal is open or not
  isOpen: boolean;
  // A function that opens the login modal
  onOpen: () => void;
  // A function that closes the login modal
  onClose: () => void;
}

// Create a new Zustand store with the LoginModalStore interface
const useLoginModal = create<LoginModalStore>((set) => ({
  // Initialize the 'isOpen' property to false
  isOpen: false,
  // Define the 'onOpen' function, which sets the 'isOpen' property to true
  onOpen: () => set({ isOpen: true }),
  // Define the 'onClose' function, which sets the 'isOpen' property to false
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
