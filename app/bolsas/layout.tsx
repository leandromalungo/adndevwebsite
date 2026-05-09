import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bolsas de Estudo | ADN Developer",
  description: "Descubra oportunidades de bolsas de estudo integrais e parciais em tecnologia disponibilizadas por instituições na Angola, Brasil, Portugal e outros países lusófonos.",
};

export default function BolsasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
