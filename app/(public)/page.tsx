import BrandsBar from "../components/BrandsBar/BrandsBar";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import Offer from "../components/Offer/Offer";
import HomeLandpage from "../pages/HomeLandpage";

export default function headerPage() {
  return (
    <div>
      <HomeLandpage />
      <BrandsBar />
      <Offer />
      <NewArrivals />
    </div>
  );
}
