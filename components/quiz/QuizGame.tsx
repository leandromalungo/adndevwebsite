"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, RefreshCcw, ChevronRight, Loader2 } from "lucide-react";
import { AreaKey, FULL_QUESTION_BANK, TECH_AREAS, TechArea, Question } from "@/app/quiz/data";

/* =======================
   HELPER: SHUFFLE ARRAY
   ======================= */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/* =======================
   COMPONENTE QUIZ GAME
   ======================= */
export function QuizGame() {
  const [step, setStep] = useState<"intro" | "loading" | "playing" | "result">("intro");
  const [name, setName] = useState("");
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  // Configuração
  const QUESTIONS_PER_SESSION = 20;

  // INICIALIZAR PERGUNTAS
  const handleStart = () => {
    if (name.trim().length > 0) {
      setStep("loading");
      
      // Simular um pequeno tempo de "carregar perguntas do servidor"
      setTimeout(() => {
        const shuffled = shuffleArray(FULL_QUESTION_BANK);
        const selected = shuffled.slice(0, QUESTIONS_PER_SESSION);
        setSessionQuestions(selected);
        setScores({});
        setCurrentQIndex(0);
        setStep("playing");
      }, 800);
    }
  };

  // JOGO: Responder
  const handleAnswer = (weights: Partial<Record<AreaKey, number>>) => {
    // Atualizar scores
    const newScores = { ...scores };
    Object.entries(weights).forEach(([key, weight]) => {
      // Garantir que weight é tratado como número
      const w = Number(weight) || 0;
      newScores[key] = (newScores[key] || 0) + w;
    });
    setScores(newScores);

    // Próxima pergunta ou Resultado
    if (currentQIndex < sessionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setStep("result");
    }
  };

  // RESULTADO: Calcular vencedor
  const getResult = (): { area: TechArea; percent: number; breakdown: any[] } => {
    let maxScore = -1;
    let winnerKey: AreaKey = "frontend"; // fallback
    let totalScore = 0;

    // 1. Calcular total e encontrar vencedor
    Object.entries(scores).forEach(([key, val]) => {
      totalScore += val;
      if (val > maxScore) {
        maxScore = val;
        winnerKey = key as AreaKey;
      }
    });

    // 2. Criar breakdown ordenado
    const breakdown = Object.entries(TECH_AREAS).map(([key, area]) => {
      const score = scores[key] || 0;
      // Percentagem relativa ao total de pontos distribuídos
      const rawPercent = totalScore > 0 ? (score / totalScore) * 100 : 0;
      return { ...area, score, percent: Math.round(rawPercent) };
    }).sort((a, b) => b.score - a.score);

    return {
      area: TECH_AREAS[winnerKey],
      percent: breakdown.find(b => b.id === winnerKey)?.percent || 0,
      breakdown: breakdown.slice(0, 5) // Top 5
    };
  };

  const handleReset = () => {
    setStep("intro");
    setName("");
    setScores({});
    setCurrentQIndex(0);
    setSessionQuestions([]);
  };

  // --- RENDERIZADORES --- //

  if (step === "intro") {
    return (
      <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="p-4 bg-violet-600/20 rounded mb-2 border border-violet-500/30 opacity-30">
          <CheckCircle2 className="w-12 h-12 text-violet-500" />
        </div>
        <h2 className="text-3xl md:text-5xl text-white tracking-tight">
          Descobre o teu perfil Tech!
        </h2>
        <p className="text-zinc-400 max-w-lg text-lg">
          Vamos fazer <span className="text-violet-400">{QUESTIONS_PER_SESSION} perguntas</span> rápidas e aleatórias para analisar o teu perfil em áreas como Frontend, Backend, AI, Segurança, Gestão e mais.
        </p>
        
        <div className="w-full max-w-sm space-y-4 pt-4">
          <div className="text-left w-full">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2 ml-1">
              Como te chamas?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ana Silva"
              className="w-full px-4 py-4 rounded bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-lg"
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              autoComplete="off"
            />
          </div>
          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full py-4 px-6 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded transition-all active:scale-95 flex items-center justify-center gap-2 text-lg shadow-lg shadow-violet-900/20"
          >
            Começar agora <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin mb-4" />
        <p className="text-zinc-400">A sortear perguntas para ti, {name}...</p>
      </div>
    );
  }

  if (step === "playing") {
    const question = sessionQuestions[currentQIndex];
    const progress = ((currentQIndex + 1) / QUESTIONS_PER_SESSION) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto animate-in slide-in-from-right duration-300">
        {/* Header/Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-zinc-400 mb-2 font-medium">
            <span>Questão <span className="text-violet-400">{currentQIndex + 1}</span> de {QUESTIONS_PER_SESSION}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(124,58,237,0.5)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight min-h-[80px]">
          {question.text}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.weights)}
              className="w-full text-left p-5 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700 hover:border-violet-500 transition-all group active:scale-[0.99] duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-200 group-hover:text-white transition-colors text-lg">
                  {opt.label}
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "result") {
    const result = getResult();

    return (
      <div className="text-center animate-in zoom-in duration-500">
        <p className="text-lg text-zinc-400 mb-2">Olá <span className="text-white font-bold">{name}</span>, a tua área ideal é:</p>
        
        <div className={`inline-flex p-6 rounded-full ${result.area.color} bg-opacity-20 mb-6 ring-4 ring-white/5`}>
           <CheckCircle2 className={`w-16 h-16 ${result.area.color.replace('bg-', 'text-')}`} />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {result.area.label}
        </h2>
        
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {result.area.description}
        </p>

        {/* Breakdown Chart */}
        <div className="max-w-md mx-auto bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800 mb-10 shadow-2xl">
          <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 text-left border-b border-zinc-800 pb-2">
            Top 5 Compatibilidades
          </h4>
          <div className="space-y-4">
            {result.breakdown.map((item) => (
              <div key={item.id} className="space-y-1 group">
                <div className="flex justify-between text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  <span>{item.label}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-200 rounded-xl transition-all font-semibold active:scale-95"
        >
          <RefreshCcw size={18} />
          Refazer com novas perguntas
        </button>
      </div>
    );
  }
  
  return null;
}
