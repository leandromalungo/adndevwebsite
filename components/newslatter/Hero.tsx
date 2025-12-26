import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo-hero.png";

const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center pt-16 pb-10 px-4 text-center max-w-3xl mx-auto w-full"
      style={{
        backgroundImage: "url('/fundo1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        src={logo}
        alt="logo hero"
        width={150}
        height={150}
        priority
        className="max-w-full h-auto object-contain"
      />
    </section>
  );
};

export default Hero;
