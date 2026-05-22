import Button from "@/app/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteproduct } from "../services/products";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductDeleteConfirm({
  close,
  id,
}: {
  close: () => void;
  id: string;
}) {
  const router = useRouter();
  const handleDelete = useMutation({
    mutationFn: () => deleteproduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      router.refresh();
      close();
    },
  });
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      <Button
        className="py-2 px-4 rounded-md"
        onClick={() => handleDelete.mutate()}
      >
        Confirm
      </Button>
    </div>
  );
}
