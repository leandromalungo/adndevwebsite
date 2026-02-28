import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulheres na T.I (WTM) | ADN Developer",
  description: "Conheça as iniciativas Women Techmakers e histórias inspiradoras de mulheres que estão a impulsionar o mercado de tecnologia na lusofonia.",
};


export default function WtmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
