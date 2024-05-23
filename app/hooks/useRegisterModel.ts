import { create } from "zustand";

// Define the interface for the RegisterModalStore
interface RegisterModalStore {
  // A boolean indicating whether the register modal is open or not
  isOpen: boolean;
  // A function that opens the register modal
  onOpen: () => void;
  // A function that closes the register modal
  onClose: () => void;
}

// Create a new Zustand store with the RegisterModalStore interface
const useRegisterModal = create<RegisterModalStore>((set) => ({
  // Initialize the 'isOpen' property to false
  isOpen: false,
  // Define the 'onOpen' function, which sets the 'isOpen' property to true
  onOpen: () => set({ isOpen: true }),
  // Define the 'onClose' function, which sets the 'isOpen' property to false
  onClose: () => set({ isOpen: false }),
}));

// Export the 'useRegisterModal' store as the default export
export default useRegisterModal;
