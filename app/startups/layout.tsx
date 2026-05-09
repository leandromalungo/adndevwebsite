import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startups | ADN Developer",
  description: "Aprenda como criar base, escalar e inovar na sua startup de tecnologia com conteúdos focados no ecossistema empreendedor.",
};

export default function StartupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
