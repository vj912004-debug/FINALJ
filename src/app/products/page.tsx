import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Material Grades",
  description:
    "Structural, boiler, alloy and wear-resistant steel grades — Jagdamba Procut Vadodara.",
};

export default function ProductsPage() {
  redirect("/grades");
}
