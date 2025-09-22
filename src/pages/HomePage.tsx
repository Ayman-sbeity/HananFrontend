import Box from "@mui/material/Box";
import ArtisticCarousel from "../components/ArtisticCarousel";
import AboutUsSection from "./homePagesSections/AboutUsSection";
import NewArrivalsSection from "./homePagesSections/NewArrivalsSection";
import WhyChooseUsSection from "./homePagesSections/WhyChooseUsSection";
import FeaturedProductsSection from "./homePagesSections/FeaturedProductsSection";
import SpecialOffersSection from "./homePagesSections/SpecialOffersSection";

export default function HomePage() {
  return (
    <>
      <Box sx={{ width: "100%" }}>

        <ArtisticCarousel />

        <AboutUsSection />

        <Box sx={{ width: "100%", mt: { xs: 4, md: 6 } }}>
          <NewArrivalsSection />
        </Box>

        <FeaturedProductsSection />

        <SpecialOffersSection />

        <WhyChooseUsSection />

      </Box>
    </>
  );
}
