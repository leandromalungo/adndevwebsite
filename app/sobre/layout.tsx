import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós | ADN Developer",
  description:
    "Conheça a ADN Developer, o maior hub de conteúdos, eventos, bolsas de estudo e oportunidades tecnológicas para a comunidade lusófona.",
  openGraph: {
    title: "Sobre Nós | ADN Developer",
    description:
      "Conheça a visão, missão e os objetivos da ADN Developer no ecossistema tecnológico lusófono.",
    url: "https://adndeveloper.com/sobre",
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
