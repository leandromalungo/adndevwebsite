
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { QuizGame } from "@/components/quiz/QuizGame";

/* =======================
   DADOS EXISTENTES (DICAS)
   ======================= */
interface CareerTip {
  id: string;
  date: string;
  title: string;
  image: string;
  imageAlt: string;
}

const careerTipsData: CareerTip[] = [
  {
    id: "1",
    date: "Mar 12, 2025",
    title: "Carreira em Cybersecurity: o que você precisa saber",
    image: "/images/img3.jpg",
    imageAlt: "Cybersecurity",
  },
  {
    id: "2",
    date: "Mar 15, 2025",
    title: "O que é UI/UX Design?",
    image: "/images/img2.jpg",
    imageAlt: "Tecnologia",
  },
  {
    id: "3",
    date: "Mar 20, 2025",
    title: "Como se tornar um GameDev?",
    image: "/images/f3061d32abe90a964a881339068c5c9f.jpg",
    imageAlt: "Data Science",
  },
  {
    id: "4",
    date: "Mar 25, 2025",
    title: "Como construir um portfolio?",
    image: "/images/10e269341acdb04f9e95d5b09e18e71e.jpg",
    imageAlt: "Cursos",
  },
  {
    id: "5",
    date: "Mar 28, 2025",
    title: "Qual a melhor linguagem?",
    image: "/images/img5.jpg",
    imageAlt: "IA e ML",
  },
];

/* =======================
   PÁGINA PRINCIPAL
   ======================= */
export default function CareerQuizPage() {
  return (
    <>
      <Navbar />

      {/* QUIZ SECTION CONTAINER */}
      <section className="relative w-full min-h-[700px] bg-zinc-950 flex flex-col justify-center overflow-hidden py-20">
        {/* Background Decorative */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url('/fundo.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded p-6 md:p-12 shadow-2xl ring-1 ring-white/5">
            <QuizGame />
          </div>
        </div>
      </section>

 

      <Footer />
    </>
  );
}
