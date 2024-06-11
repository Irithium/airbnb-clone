"use client";

import { useCallback } from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Defining the interface for the Counter component's props
interface CounterPorps {
  // Title of the counter
  title: string;
  // Subtitle of the counter
  subtitle: string;
  // Current value of the counter
  value: number;
  // Callback function to update the counter value
  onChange: (value: number) => void;
}

// Defining the Counter component as a functional component
const Counter: React.FC<CounterPorps> = ({
  // Destructuring the props
  title,
  subtitle,
  value,
  onChange,
}) => {
  // Memoizing the onAdd function to prevent unnecessary re-renders
  const onAdd = useCallback(() => {
    // Incrementing the counter value and calling the onChange callback
    onChange(value + 1);
  }, [onChange, value]);

  // Memorizing the onReduce function to prevent unnecessary re-renders
  const onReduce = useCallback(() => {
    // Checking if the counter value is greater than 1
    if (value === 1) {
      return;
    }
    // Decrementing the counter value and calling the onChange callback
    onChange(value - 1);
  }, [onChange, value]);

  // Returning the JSX for the Counter component
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          // Handling the onReduce function on click
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          // Handling the onAdd function on click
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
