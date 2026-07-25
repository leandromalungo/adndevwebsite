import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nós | ADN Developer",
    description: "Conheça a visão, missão e a equipa por trás do ADN Developer, o maior repositório de tecnologia da lusofonia.",
    robots: { index: true, follow: true },
};

export default function SobreNosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
