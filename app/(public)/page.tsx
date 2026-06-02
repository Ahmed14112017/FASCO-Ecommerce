import BrandsBar from "./BrandsBar/BrandsBar";
import NewArrivals from "./NewArrivals/NewArrivals";
import Offer from "./Offer/Offer";
import HeroSlider from "./HeroSlider";
import HomeLandpage from "../pages/HomeLandpage";

export default function headerPage() {
  return (
    <div>
      <HomeLandpage />
      <BrandsBar />
      <Offer />
      <NewArrivals />
      <HeroSlider />
    </div>
  );
}
