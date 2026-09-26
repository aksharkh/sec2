import Hero from "@/components/home/Hero";
import FrameworkMarquee from "@/components/home/FrameworkMarquee";
import Manifesto from "@/components/home/Manifesto";
import ZoomThrough from "@/components/home/ZoomThrough";
import OverlapTool from "@/components/home/OverlapTool";
import Portal from "@/components/home/Portal";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Industries from "@/components/home/Industries";
import StoriesTeaser from "@/components/home/StoriesTeaser";
import Coverage from "@/components/home/Coverage";
import WhyUs from "@/components/home/WhyUs";
import Insights from "@/components/home/Insights";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FrameworkMarquee />
      <Manifesto />
      <ZoomThrough />
      <OverlapTool />
      <Portal />
      <Services />
      <Process />
      <Industries />
      <StoriesTeaser />
      <WhyUs />
      <Coverage />
      <Insights />
      <FinalCTA />
    </>
  );
}
