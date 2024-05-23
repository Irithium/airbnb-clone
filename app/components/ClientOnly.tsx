"use client";

import React, { useEffect, useState } from "react";

// Defining an interface for the ClientOnlyProps
interface ClientOnlyProps {
  // The children property is a required property of type ReactNode
  children: React.ReactNode;
}

// Defining a functional component named ClientOnly
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  // Creating a state variable hasMounted and initializing it to false
  const [hasMounted, setHasMounted] = useState(false);

  // Using the useEffect hook to set hasMounted to true when the component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // If hasMounted is false, return null
  if (!hasMounted) {
    return null;
  }
  // Else, return the children component
  else return <>{children}</>;
};

export default ClientOnly;
