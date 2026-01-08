"use client";

/* Layout base */
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/hero";
import Faq from "@/components/home/faqHero";
import Footer from "@/components/Footer";

/* Home sections */
import { CardHero } from "@/components/home/CardHero";
import { ServicesSection } from "@/components/home/sectionHero";
import { LogoCloud } from "@/components/home/logosHero";
import Vision from "@/components/home/VisionHero";
import Impact from "@/components/home/ImpactHero";
import Partners from "@/components/home/PartnersHero";
import Testimonials from "@/components/home/TestimonialsHero";
import CuratedCollections from "@/components/roadmaps/courses/CuratedCollections";

const Page = () => {
  /* ---------- DADOS ---------- */

 const servicesData = [
  {
    id: 1,
    title: "AngoTic",
    description:
      "Create jaw-dropping renders thanks to Cycles, high-end production path tracer.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "DevFest",
    description:
      "Sculpting, retopology, modeling, curves. Blender's modeling toolset is extensive.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Sculpting",
    description:
      "Digital sculpting tools provide the power and flexibility required in several stages of the digital production pipeline.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Animation & Rigging",
    description:
      "Designed for animation, Blender is being used for award-winning shorts and feature films.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Story Artist",
    description:
      "Push the boundaries of Story Art and by drawing in a 3D environment.",
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "VFX",
    description:
      'From camera and object motion tracking to masking and compositing, you can "fix it in post".',
    imageUrl: "/images/img1.jpg",
    link: "#",
  },
];


  /* ---------- RENDERIZAÇÃO ---------- */

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full bg-black overflow-hidden">
        {/* Conteúdo do Hero */}
        <main className="relative z-10">
          <Hero />
          <LogoCloud />
        </main>

        {/* Background isolado APENAS do Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://cdn.prod.website-files.com/685be7dcd32275d3830651d3/68f7343a86a7563b64024c01_hp_desktop_a.webp"
            alt="Hero Background"
            className="absolute w-full h-full object-cover opacity-60 grayscale-[0.2]"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
        </div>
      </section>

      {/* ================= CONTEÚDO NORMAL ================= */}
      <section className="relative z-10 bg-[#f7f8f9] flex flex-col items-center py-5 px-4 md:px-10 space-y-24">
        <div className="w-full max-w-7xl">
          <ServicesSection services={servicesData} />
        </div>
        <CuratedCollections />
        <Impact />
        <Vision />

        <div className="w-full max-w-7xl">
          <CardHero
            title="The Ecosystem"
            paragraphs={[
              "Countless communities and thriving businesses are built around Blender.",
              "Together, these tutorial makers and content creators, add-on developers and global marketplaces form an ever-expanding ecosystem.",
            ]}
          />
        </div>
      </section>

      <Testimonials />
      <Partners />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
