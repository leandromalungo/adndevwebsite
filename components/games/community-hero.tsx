// Exemplo: components/games/hero.tsx
"use client"; // adicione esta linha no topo
import React from "react";
// resto do código...

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CommunityHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-green-500 to-blue-600 p-12 md:p-16">
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-500/30 to-cyan-500/30 blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Comunidade</h2>
        <p className="mb-8 text-lg text-white/90 leading-relaxed">
          Junte-se à maior comunidade de usuário do Unity. Todos os tipos de criadores, do iniciante ao avançado, do
          amador ao profissional, conectam-se aqui para aprender, compartilhar e inspirar.
        </p>
        <Button
          size="lg"
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          CONHEÇA A COMUNIDADE
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}