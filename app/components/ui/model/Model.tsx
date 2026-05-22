import { ReactNode } from "react";
import Button from "../Button";
import { X } from "lucide-react";
interface ModelProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  action?: () => void;
}
export default function Model({ children, open, onClose, action }: ModelProps) {
  if (!open) return null;
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  border border-gray-400 flex flex-col justify-center shadow-2xl p-8 w-1/2 rounded-2xl bg-white ">
      <div className="flex justify-end">
        <Button onClick={onClose}>
          <X />
        </Button>
      </div>

      {children}
    </div>
  );
}
