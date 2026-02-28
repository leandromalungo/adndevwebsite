import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos e Formações | ADN Developer",
  description: "Encontre os melhores cursos gratuitos e roadmaps de estudo para alavancar a sua carreira como desenvolvedor ou profissional de TI.",
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
