import { GetGategory } from "@/app/(admin)/categories/services/categories";
import Categoryform from "./components/Categoryform";

export default async function Admincategoriespage() {
  const data = await GetGategory();

  return (
    <>
      <Categoryform data={data} />
    </>
  );
}
