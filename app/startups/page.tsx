import type { Metadata } from "next";
import StartupsContent from "@/components/startups/StartupsContent";

export const metadata: Metadata = {
  title: "Recursos e apoio para Startups",
  description:
    "Conteúdos, eventos e oportunidades para startups, empreendedores e inovadores em Angola, Brasil, Portugal, Moçambique e toda lusofonia.",
};

const Page = () => {
  return <StartupsContent />;
};

export default Page;
