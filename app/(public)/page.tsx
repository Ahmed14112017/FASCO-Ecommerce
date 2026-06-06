import BrandsBar from "./BrandsBar/BrandsBar";
import NewArrivals from "./NewArrivals/NewArrivals";
import Offer from "./Offer/Offer";
import HeroSlider from "./HeroSlider";
import HomeLandpage from "./HomeLandpage";
import InstagramSection from "./Instagram/InstagramSection";
import Testimonials from "./Testimonials/Testimonials";

export default function headerPage() {
  return (
    <div>
      <div id="home" className="animate-fade-in">
        <HomeLandpage />
      </div>
      <BrandsBar />
      <div id="deals" className="animate-fade-in">
        <Offer />
      </div>
      <div id="new-arrivals" className="animate-fade-in">
        <NewArrivals />
      </div>
      <div className="animate-fade-in">
        <HeroSlider />
      </div>
      <div className="animate-fade-in">
        <InstagramSection />
      </div>
      <div className="animate-fade-in">
        <Testimonials />
      </div>
    </div>
  );
}
