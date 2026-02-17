"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Clock, BarChart, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_COURSES } from "@/data/mockCourses";
import { slugify } from "@/lib/utils";

export default function AreaCoursesPage() {
  const params = useParams();
  const router = useRouter();
  const areaSlug = params.area as string;

  // Encontra os cursos para esta área
  const courses = useMemo(() => {
    return MOCK_COURSES.filter((course) => slugify(course.area) === areaSlug);
  }, [areaSlug]);

  // Tenta encontrar o título "bonito" da área baseado no primeiro curso encontrado ou des-slugificando
  const areaTitle =
    courses.length > 0 ? courses[0].area : areaSlug.replace(/-/g, " ");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-800 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para áreas
            </button>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              Cursos de {areaTitle}
            </h1>
            <p className="mt-2 text-gray-600">
              Descubra os melhores cursos gratuitos e pagos para se tornar um{" "}
              {areaTitle}.
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        <span className="text-4xl font-bold opacity-20">
                          ADN
                        </span>
                      </div>
                    )}
                    {course.provider && (
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
                        {course.provider}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          course.level === "Iniciante"
                            ? "bg-gray-200 text-violet-700"
                            : course.level === "Intermediário"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.level || "Todos os níveis"}
                      </span>
                      {course.rating && (
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Star className="w-3 h-3 fill-current mr-1" />
                          {course.rating}
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration || "Ritmo próprio"}
                      </div>

                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Acessar
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <span className="text-[7px] text-gray-600 mt-3">
                      Fonte: Este curso tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Ainda não temos cursos cadastrados para a área de{" "}
                <span className="font-semibold">{areaTitle}</span>. Volte em
                breve!
              </p>
              <button
                onClick={() => router.back()}
                className="mt-6 text-blue-600 font-medium hover:underline"
              >
                Voltar para lista de áreas
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
