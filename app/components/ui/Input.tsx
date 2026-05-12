import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-4 py-3 bg-transparent border-b border-gray-200 outline-none text-sm text-gray-900 focus:border-gray-900 transition-colors ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
