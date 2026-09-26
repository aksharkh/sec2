import type { Metadata } from "next";
import PillarPage from "@/components/page/PillarPage";

export const metadata: Metadata = { title: "Privacy & regulatory compliance" };

export default function Page() {
  return <PillarPage id="privacy" />;
}
