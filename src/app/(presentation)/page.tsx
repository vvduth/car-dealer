
import { PageProps } from "@/config/types";
import HeroSection from "@/components/homepage/hero-section";
import { FeaturesSection } from "@/components/homepage/features-section";
import LastestArrival from "@/components/homepage/lastest-arrival";
import OurBrandSection from "@/components/homepage/our-brands-section";
import TestimonialsSection from "@/components/homepage/testimonials-section";
import LocationSection from "@/components/homepage/location-section";


export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;

  
  return (
    <>
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LastestArrival />
      <TestimonialsSection />
      <OurBrandSection  />
      <LocationSection />
    </>
  );
}
