import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos | ADN Developer",
  description: "Descubra e participe dos principais eventos de tecnologia na lusofonia. Fique por dentro de conferências, meetups e encontros para desenvolvedores.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
