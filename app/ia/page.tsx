import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroIA from "@/components/ia/HeroIA";
import HackathonsSection from "@/components/ia/HackathonsSection";
import PromoSection from "@/components/ia/PromoSection";
import CuboAISection from "@/components/ia/CuboAISection";
import HubSection from "@/components/ia/HubSection";
import Slide from "@/components/ia/Slide";

export const metadata: Metadata = {
    title: "Inteligência Artificial | ADN Developer",
    description: "Comunidade de criadores, construindo com Inteligência Artificial moderna e de ponta.",
};

export default function IAPage() {
    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <main className="flex-1">           
                <HeroIA />
                <CuboAISection />
                <HackathonsSection />
                <PromoSection />
                <HubSection />
                <Slide />
            </main>

            <Footer />
        </div>
    );
}
