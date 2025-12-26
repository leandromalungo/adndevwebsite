// Exemplo: components/games/hero.tsx
"use client"; // adicione esta linha no topo
import React from "react";
// resto do código...

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/gameHero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-purple-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex justify-end p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </header>

        {/* Hero Section */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-8 text-6xl font-bold text-white md:text-7xl lg:text-8xl">
            ECOSSISTEMA GAMING
          </h1>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="relative px-6 py-3 bg-blue-600 text-white font-semibold shadow-lg overflow-hidden transition duration-300 hover:shadow-blue-500/50 before:absolute before:inset-0 before:bg-blue-400 before:blur-xl before:opacity-30 before:content-['']"
              style={{ borderRadius: "0.5rem" }}
            >
              <span className="relative z-10 text-base tracking-wider">
                Ver mais
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Link href="#pricing">
              <Button
                variant="ghost"
                size="lg"
                className="
                group
                relative
                overflow-hidden
                text-white
                border border-white/20
                transition-all
                duration-300
                ease-out
                hover:bg-white
                hover:text-black
              "
                style={{ borderRadius: "0.5rem" }}
              >
                {/* Borda animada */}
                <span className="pointer-events-none absolute inset-0 rounded-md">
                  <span className="absolute inset-0 rounded-md border border-white/60 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 animate-border-glow" />
                </span>

                <span className="relative z-10 flex items-center text-base">
                  PLANOS E PREÇOS
                </span>
              </Button>
            </Link>
          </div>
          <p
            className="
          mx-auto
          mt-5
          max-w-xl
          text-center
          text-sm
          leading-relaxed
          text-white/90

          sm:mt-6
          sm:max-w-2xl
          sm:text-base

          md:mt-8
          md:max-w-3xl
          md:text-lg

          lg:mt-10
          lg:max-w-4xl
          lg:text-xl
          mb-4
        "
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
            expedita, pariatur ex aliquid quaerat qui labore natus mollitia
            tenetur possimus consequuntur iste ipsam, odio voluptate excepturi
            esse, reprehenderit odit officia.
          </p>
          <div className="mb-8 flex justify-center md:hidden">
            <ArrowDown className="h-5 w-5 text-white/80 animate-bounce" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-8 px-6 pb-12 md:grid-cols-3 md:gap-12 lg:px-20">
          <div className="flex flex-col gap-2 bg-whitw/20 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30">
            <div className="text-4xl font-bold text-white md:text-5xl">25+</div>
            <p className="text-sm text-white/90 leading-relaxed ">
              plataformas para usuários finais compatíveis com criações do
              Unity*
            </p>
          </div>

          <div className="flex flex-col gap-2 bg-whitw/20 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30">
            <div className="text-4xl font-bold text-white md:text-5xl">
              3,6 bilhões
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              downloads mensais de aplicativos Made with Unity²
            </p>
          </div>

          <div className="flex flex-col gap-2 bg-whitw/20 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30">
            <div className="text-4xl font-bold text-white md:text-5xl">82</div>
            <p className="text-sm text-white/90 leading-relaxed">
              dos 100 principais jogos usam o Unity para expandir seus jogos³
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
