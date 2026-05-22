import Counter from "./Counter/Counter";
import Offershow from "./Offershow/Offershow";

export default function Offer() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 container  mx-auto px-4 py-8">
      <Counter />
      <Offershow />
    </div>
  );
}
