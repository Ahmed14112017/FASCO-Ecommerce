interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
export default function Button({
  children,
  className,
  disabled,
  loading,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary: "bg-black text-white hover:opacity-80",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline:
      "border border-[#5B86E5] text-[#5B86E5] hover:bg-[#5B86E5] hover:text-white",
  };
  return (
    <button
      className={`${styles[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
