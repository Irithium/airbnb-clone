"use client";

// Interface for Heading component props
interface HeadingProps {
  // Title of the heading
  title: string;
  // Optional subtitle of the heading
  subtitle?: string;
  // Optional center alignment of the heading
  center?: boolean;
}

// Functional component for rendering headings
const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  // Conditional class name for center alignment
  const className = center ? "text-center" : "text-start";

  // JSX for the heading component
  return (
    <div className={className}>
      {/* Displaying the title in a bold font */}
      <div className="text-2xl font-bold">{title}</div>
      {/* Displaying the subtitle in a light font */}
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
