"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Model from "@/app/components/ui/model/Model";
import {
  CreateGategory,
  DeleteGategory,
  GetGategory,
} from "@/lib/api/categories";
import { useCategory } from "@/lib/hooks/usegategory";
import { AddCatergoryProps } from "@/types/catergory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

export default function Categoryform() {
  const [openmodel, setopenmodel] = useState(false);
  const [typemodel, settypemodel] = useState("");
  const [selectid, setselectid] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCatergoryProps>();
  const openmodelfun = (type: string, id?: string) => {
    setopenmodel(true);
    settypemodel(type);
    if (id) {
      setselectid(id);
    }
  };
  const closemodelfun = () => {
    setopenmodel(false);
  };
  /* create category */
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: CreateGategory,
    onSuccess: () => {
      toast.success("catergory is created successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      reset();
      closemodelfun();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });
  const handlecreate = (data: AddCatergoryProps) => {
    mutation.mutate(data);
  };
  /* get category */

  const { data: categorydata, isLoading, isError } = useCategory();
  {
    isLoading && <p>loading...</p>;
  }
  {
    isError && <p>error...</p>;
  }
  /* Delete category */

  const DeleteMutatuion = useMutation({
    mutationFn: DeleteGategory,
    onSuccess: () => {
      toast.success("category is deleted successfully");
      closemodelfun();
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "An error occurred");
    },
  });
  return (
    <section className="py-2 px-3">
      <div className="flex justify-between items-center py-6">
        <h3>categories</h3>
        <Button
          onClick={() => openmodelfun("Add")}
          variant="primary"
          className="py-3 px-5 rounded-md"
        >
          Add Category
        </Button>
      </div>
      <div>
        {categorydata?.map((cat) => {
          return (
            <div
              key={cat._id}
              className="p-3 shadow shadow-mist-600 flex justify-between "
            >
              <p className="py-2">{cat.name}</p>
              <Button
                variant="secondary"
                type="button"
                onClick={() => openmodelfun("delete", cat._id)}
              >
                <Trash />
              </Button>
            </div>
          );
        })}
      </div>
      <Model open={openmodel} onClose={closemodelfun}>
        <h3>{typemodel} catrogry</h3>
        {typemodel === "Add" ? (
          <form onSubmit={handleSubmit(handlecreate)}>
            <div className="flex flex-col gap-4 py-4">
              <Input
                placeholder="Enter Name"
                {...register("name", {
                  required: "requried",
                })}
              />
              <Input
                placeholder="Enter Slug"
                {...register("slug", {
                  required: "requried",
                })}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                variant="primary"
                className="rounded-md py-2 px-4 "
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className="rounded-md py-2 px-4 "
                onClick={closemodelfun}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center w-full">
            <p>Are you sure?</p>
            <div className="flex justify-between items-center w-full">
              <Button
                className="py-2 px-4 rounded-md"
                onClick={() => DeleteMutatuion.mutate(selectid)}
              >
                confirm
              </Button>
              <Button
                className="py-2 px-4 rounded-md"
                variant="secondary"
                onClick={closemodelfun}
              >
                cancel
              </Button>
            </div>
          </div>
        )}
      </Model>
    </section>
  );
}
