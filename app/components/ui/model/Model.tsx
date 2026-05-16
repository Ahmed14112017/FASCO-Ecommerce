import { ReactNode } from "react";
interface ModelProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  action?: () => void;
}
export default function Model({ children, open, onClose, action }: ModelProps) {
  if (!open) return null;
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg border border-gray-400 flex flex-col justify-center items-center shadow-2xl p-8 w-96 rounded-2xl">
      {children}
    </div>
  );
}
