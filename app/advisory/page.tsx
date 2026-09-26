import type { Metadata } from "next";
import PillarPage from "@/components/page/PillarPage";

export const metadata: Metadata = { title: "GRC advisory" };

export default function Page() {
  return <PillarPage id="advisory" />;
}
