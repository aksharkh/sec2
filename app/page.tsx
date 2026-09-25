import Hero from "@/components/home/Hero";
import FrameworkMarquee from "@/components/home/FrameworkMarquee";
import Manifesto from "@/components/home/Manifesto";
import OverlapTool from "@/components/home/OverlapTool";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Industries from "@/components/home/Industries";
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
      <OverlapTool />
      <Services />
      <Process />
      <Industries />
      <Coverage />
      <WhyUs />
      <Insights />
      <FinalCTA />
    </>
  );
}
