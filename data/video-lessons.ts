export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  level: "junior" | "pleno" | "senior";
  roadmapId: string;
  channel?: string;
  duration?: string;
}

export const VIDEO_LESSONS: VideoLesson[] = [
  // Frontend - Júnior
  {
    id: "fe-junior-1",
    title: "Vídeo: wbNFh45pceI",
    description: "Aula de Frontend recomendada para iniciar com fundamentos práticos.",
    thumbnail: "https://img.youtube.com/vi/wbNFh45pceI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=wbNFh45pceI",
    level: "junior",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-junior-2",
    title: "Vídeo: wmM1Y0FTiz8",
    description: "Conteúdo recomendado para avançar na construção de interfaces modernas.",
    thumbnail: "https://img.youtube.com/vi/wmM1Y0FTiz8/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=wmM1Y0FTiz8",
    level: "junior",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-junior-3",
    title: "Vídeo: Ab-kGzlCCWI",
    description: "Aula prática para reforçar conceitos essenciais de Frontend.",
    thumbnail: "https://img.youtube.com/vi/Ab-kGzlCCWI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Ab-kGzlCCWI",
    level: "junior",
    roadmapId: "frontend",
    channel: "YouTube"
  },

  // Frontend - Pleno
  {
    id: "fe-pleno-1",
    title: "Vídeo: XXW2KVs8cUQ",
    description: "Aula avançada recomendada para desenvolvedores Frontend Pleno.",
    thumbnail: "https://img.youtube.com/vi/XXW2KVs8cUQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=XXW2KVs8cUQ",
    level: "pleno",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-pleno-2",
    title: "Vídeo: S-trXOddXMQ",
    description: "Conteúdo recomendado para quem busca aprofundar conhecimentos intermediários.",
    thumbnail: "https://img.youtube.com/vi/S-trXOddXMQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=S-trXOddXMQ",
    level: "pleno",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-pleno-3",
    title: "Vídeo: p9NiJ-yj2cQ",
    description: "Aula prática indicada para quem já domina o básico e quer avançar.",
    thumbnail: "https://img.youtube.com/vi/p9NiJ-yj2cQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=p9NiJ-yj2cQ",
    level: "pleno",
    roadmapId: "frontend",
    channel: "YouTube"
  },

  // Frontend - Sênior
  {
    id: "fe-senior-1",
    title: "Vídeo: tHbrjCtNx7Q",
    description: "Conteúdo avançado para desenvolvedores Frontend Sênior.",
    thumbnail: "https://img.youtube.com/vi/tHbrjCtNx7Q/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=tHbrjCtNx7Q",
    level: "senior",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-senior-2",
    title: "Vídeo: L6SAAyLwIRE",
    description: "Aula recomendada para revisar padrões e arquitetura avançada de frontend.",
    thumbnail: "https://img.youtube.com/vi/L6SAAyLwIRE/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=L6SAAyLwIRE",
    level: "senior",
    roadmapId: "frontend",
    channel: "YouTube"
  },
  {
    id: "fe-senior-3",
    title: "Vídeo: JT_aaIEhH2Y",
    description: "Conteúdo para desenvolvedores experientes que buscam atualização contínua.",
    thumbnail: "https://img.youtube.com/vi/JT_aaIEhH2Y/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=JT_aaIEhH2Y",
    level: "senior",
    roadmapId: "frontend",
    channel: "YouTube"
  },

  // Backend - Júnior
  {
    id: "be-junior-1",
    title: "Vídeo: kjmZZgtS0iU",
    description: "Aula essencial para desenvolvedores backend iniciantes.",
    thumbnail: "https://img.youtube.com/vi/kjmZZgtS0iU/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/kjmZZgtS0iU?si=qN6YGDJ4C1xn9tAK",
    level: "junior",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-junior-2",
    title: "Vídeo: wXMlMsDvk2M",
    description: "Conteúdo recomendado para quem está começando em backend.",
    thumbnail: "https://img.youtube.com/vi/wXMlMsDvk2M/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/wXMlMsDvk2M?si=0IRTr_u8uFc5UnLa",
    level: "junior",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-junior-3",
    title: "Vídeo: bAbX8csOIS4",
    description: "Aula prática indicada para reforçar conhecimentos básicos de backend.",
    thumbnail: "https://img.youtube.com/vi/bAbX8csOIS4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/bAbX8csOIS4?si=-A3VfLx2MEknbnFE",
    level: "junior",
    roadmapId: "backend",
    channel: "YouTube"
  },

  // Backend - Pleno
  {
    id: "be-pleno-1",
    title: "Vídeo: TcInk4kYq_g",
    description: "Conteúdo intermediário recomendado para desenvolvedores backend.",
    thumbnail: "https://img.youtube.com/vi/TcInk4kYq_g/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/TcInk4kYq_g?si=7LMpNv6Vs_JQJHjH",
    level: "pleno",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-pleno-2",
    title: "Vídeo: eftbQXnR4Y0",
    description: "Aula recomendada para reforçar arquitetura e boas práticas backend.",
    thumbnail: "https://img.youtube.com/vi/eftbQXnR4Y0/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/eftbQXnR4Y0?si=insHlCCo1Wl9-z5u",
    level: "pleno",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-pleno-3",
    title: "Vídeo: PccwbjQe4tE",
    description: "Aula avançada para desenvolvedores backend em crescimento.",
    thumbnail: "https://img.youtube.com/vi/PccwbjQe4tE/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/PccwbjQe4tE?si=4w-Dau1c4L-fsyjc",
    level: "pleno",
    roadmapId: "backend",
    channel: "YouTube"
  },

  // Backend - Sênior
  {
    id: "be-senior-1",
    title: "Vídeo: PnQY02QQrYQ",
    description: "Conteúdo avançado recomendado para desenvolvedores backend sénior.",
    thumbnail: "https://img.youtube.com/vi/PnQY02QQrYQ/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/PnQY02QQrYQ?si=dIu2uJoTMUAnr-yn",
    level: "senior",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-senior-2",
    title: "Vídeo: Bi0nVMm4dGc",
    description: "Aula robusta para backend seniores que buscam aprofundar conhecimento.",
    thumbnail: "https://img.youtube.com/vi/Bi0nVMm4dGc/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/Bi0nVMm4dGc?si=zTQ9AzQg4aYYzJw-",
    level: "senior",
    roadmapId: "backend",
    channel: "YouTube"
  },
  {
    id: "be-senior-3",
    title: "Vídeo: LzLhu-pkm4k",
    description: "Aula final para consolidar conhecimentos avançados de backend.",
    thumbnail: "https://img.youtube.com/vi/LzLhu-pkm4k/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/LzLhu-pkm4k?si=dHtjbd4H5ecYqWw-",
    level: "senior",
    roadmapId: "backend",
    channel: "YouTube"
  },

  // Fullstack
  {
    id: "fs-junior-1",
    title: "Vídeo: KE9TSDqh6iw",
    description: "Aula de Fullstack indicada para iniciantes.",
    thumbnail: "https://img.youtube.com/vi/KE9TSDqh6iw/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/KE9TSDqh6iw?si=rcKaoSlChOfko4sJ",
    level: "junior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-junior-2",
    title: "Vídeo: XdXmp8Z8NBg",
    description: "Aula de Fullstack recomendada para aprender em um ambiente completo.",
    thumbnail: "https://img.youtube.com/vi/XdXmp8Z8NBg/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/XdXmp8Z8NBg?si=4ZzQESUyKaS3Wq4i",
    level: "junior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-junior-3",
    title: "Vídeo: L8LJ55R2tsU",
    description: "Conteúdo para desenvolvedores iniciantes que querem dominar Fullstack.",
    thumbnail: "https://img.youtube.com/vi/L8LJ55R2tsU/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/L8LJ55R2tsU?si=xg3N4SvvwRbuXlXG",
    level: "junior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-pleno-1",
    title: "Vídeo: S-trXOddXMQ",
    description: "Aula intermediária para desenvolvedores Fullstack.",
    thumbnail: "https://img.youtube.com/vi/S-trXOddXMQ/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/S-trXOddXMQ?si=tGSnf2HiCoGitlSf",
    level: "pleno",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-pleno-2",
    title: "Vídeo: UKG2yLZTJdo",
    description: "Aula para Fullstack pleno que aprofunda arquitetura e integração.",
    thumbnail: "https://img.youtube.com/vi/UKG2yLZTJdo/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/UKG2yLZTJdo?si=t9456VYGtIJf2SAQ",
    level: "pleno",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-pleno-3",
    title: "Vídeo: jBAmM6Ojg9I",
    description: "Aula prática para quem já atua como desenvolvedor Fullstack.",
    thumbnail: "https://img.youtube.com/vi/jBAmM6Ojg9I/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/jBAmM6Ojg9I?si=z7sCAFBeROv-QPjr",
    level: "pleno",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-senior-1",
    title: "Vídeo: 8Se_gMYORHo",
    description: "Aula recomendada para desenvolvedores Fullstack seniores.",
    thumbnail: "https://img.youtube.com/vi/8Se_gMYORHo/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/8Se_gMYORHo?si=qcQR10wAhbqNTp5g",
    level: "senior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-senior-2",
    title: "Vídeo: DYz3A9DT-Qc",
    description: "Conteúdo avançado voltado a arquitetura Fullstack e performance.",
    thumbnail: "https://img.youtube.com/vi/DYz3A9DT-Qc/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/DYz3A9DT-Qc?si=ejhfNXgLtLN0DXYd",
    level: "senior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },
  {
    id: "fs-senior-3",
    title: "Vídeo: ARYzqW0W7iI",
    description: "Aula final para desenvolvedores Fullstack sênior consolidarem conhecimento.",
    thumbnail: "https://img.youtube.com/vi/ARYzqW0W7iI/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/ARYzqW0W7iI?si=Pxh5p7l9tN9jgg82",
    level: "senior",
    roadmapId: "fullstack",
    channel: "YouTube"
  },

  // Mobile
  {
    id: "mo-junior-1",
    title: "Vídeo: QGTyIWTCCmY",
    description: "Aula mobile indicada para quem está começando.",
    thumbnail: "https://img.youtube.com/vi/QGTyIWTCCmY/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/QGTyIWTCCmY?si=ZbWLFrg0OCBOm0eL",
    level: "junior",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-junior-2",
    title: "Vídeo: P9Ek3SpowRk",
    description: "Live mobile recomendada para iniciantes entenderem o fluxo de desenvolvimento.",
    thumbnail: "https://img.youtube.com/vi/P9Ek3SpowRk/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/live/P9Ek3SpowRk?si=S9kVE-Wou9Z0WV6A",
    level: "junior",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-junior-3",
    title: "Vídeo: QPTxy-9ttc4",
    description: "Conteúdo para desenvolvedores mobile iniciantes aprofundarem conhecimentos.",
    thumbnail: "https://img.youtube.com/vi/QPTxy-9ttc4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/QPTxy-9ttc4?si=ywxUvvIph98fd06x",
    level: "junior",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-pleno-1",
    title: "Vídeo: FEVlehP1K_w",
    description: "Aula intermediária para desenvolvedores mobile plenos.",
    thumbnail: "https://img.youtube.com/vi/FEVlehP1K_w/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/FEVlehP1K_w?si=4x3do8GpgUlcs5Jk",
    level: "pleno",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-pleno-2",
    title: "Vídeo: 20WH5xB54Hc",
    description: "Aula para desenvolvedores mobile plenos focada em fluxo e usabilidade.",
    thumbnail: "https://img.youtube.com/vi/20WH5xB54Hc/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/20WH5xB54Hc?si=9Wcf58vrndNynEEY",
    level: "pleno",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-pleno-3",
    title: "Vídeo: 0ee7EB641wI",
    description: "Conteúdo prático para quem já desenvolve apps mobile.",
    thumbnail: "https://img.youtube.com/vi/0ee7EB641wI/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/0ee7EB641wI?si=Lh64iSjbbfPqt-q2",
    level: "pleno",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-senior-1",
    title: "Vídeo: 12GFiyMuVmc",
    description: "Conteúdo sénior para desenvolvedores mobile avançados.",
    thumbnail: "https://img.youtube.com/vi/12GFiyMuVmc/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/12GFiyMuVmc?si=fNKjgdDImQKpZLy5",
    level: "senior",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-senior-2",
    title: "Vídeo: gn_dyHr8seo",
    description: "Aula avançada com foco em práticas mobile modernas.",
    thumbnail: "https://img.youtube.com/vi/gn_dyHr8seo/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/gn_dyHr8seo?si=qBwGYuNvrWvjwTHC",
    level: "senior",
    roadmapId: "mobile",
    channel: "YouTube"
  },
  {
    id: "mo-senior-3",
    title: "Vídeo: -VA-4CeNaRg",
    description: "Aula final para consolidar conhecimento mobile avançado.",
    thumbnail: "https://img.youtube.com/vi/-VA-4CeNaRg/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/-VA-4CeNaRg?si=nvvQy7JB9ozzzxXR",
    level: "senior",
    roadmapId: "mobile",
    channel: "YouTube"
  },

  // DevOps
  {
    id: "dv-junior-1",
    title: "Vídeo: 5fQJC9iLCbE",
    description: "Aula DevOps indicada para quem está começando.",
    thumbnail: "https://img.youtube.com/vi/5fQJC9iLCbE/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/5fQJC9iLCbE?si=07ijrmy3utg1al-6",
    level: "junior",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-junior-2",
    title: "Vídeo: iwf6kcvxeD4",
    description: "Conteúdo fundamental para iniciantes em DevOps.",
    thumbnail: "https://img.youtube.com/vi/iwf6kcvxeD4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/iwf6kcvxeD4?si=c5uqFFAGnA3M850Q",
    level: "junior",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-junior-3",
    title: "Vídeo: _HV7MoeB_M4",
    description: "Aula prática para desenvolvedores DevOps iniciantes.",
    thumbnail: "https://img.youtube.com/vi/_HV7MoeB_M4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/_HV7MoeB_M4?si=DwN6yMaOQolpewdV",
    level: "junior",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-pleno-1",
    title: "Vídeo: PrAPwkxpbWM",
    description: "Aula intermediária para desenvolvedores DevOps plenos.",
    thumbnail: "https://img.youtube.com/vi/PrAPwkxpbWM/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/PrAPwkxpbWM?si=8TXAFRWVUrAQ4mVs",
    level: "pleno",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-pleno-2",
    title: "Vídeo: UEoxMU_l2xs",
    description: "Aula para aprofundar conhecimentos intermediários de DevOps.",
    thumbnail: "https://img.youtube.com/vi/UEoxMU_l2xs/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/UEoxMU_l2xs?si=2DwTYyTVvXIhqueV",
    level: "pleno",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-pleno-3",
    title: "Vídeo: YPL2OLe4gr8",
    description: "Conteúdo prático para quem já trabalha com DevOps.",
    thumbnail: "https://img.youtube.com/vi/YPL2OLe4gr8/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/YPL2OLe4gr8?si=wwmBHFFHhzVDeuUw",
    level: "pleno",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-senior-1",
    title: "Vídeo: XdU2E3PkZ4M",
    description: "Conteúdo sênior para desenvolvedores DevOps avançados.",
    thumbnail: "https://img.youtube.com/vi/XdU2E3PkZ4M/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/XdU2E3PkZ4M?si=fLSJPyp5INNCZj6b",
    level: "senior",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-senior-2",
    title: "Vídeo: rXPpkzdS-q4",
    description: "Aula avançada com foco em práticas DevOps modernas.",
    thumbnail: "https://img.youtube.com/vi/rXPpkzdS-q4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/rXPpkzdS-q4?si=DD0GI_Tzc6lcxSAb",
    level: "senior",
    roadmapId: "devops",
    channel: "YouTube"
  },
  {
    id: "dv-senior-3",
    title: "Vídeo: VfC5QyP4n9s",
    description: "Aula final para consolidar conhecimento DevOps sênior.",
    thumbnail: "https://img.youtube.com/vi/VfC5QyP4n9s/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/VfC5QyP4n9s?si=YRMsDeSru-k38sIB",
    level: "senior",
    roadmapId: "devops",
    channel: "YouTube"
  },

  // Data Science
  {
    id: "ds-junior-1",
    title: "Vídeo: Zwvq-rlIHAw",
    description: "Aula de Data Science indicada para iniciantes.",
    thumbnail: "https://img.youtube.com/vi/Zwvq-rlIHAw/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/Zwvq-rlIHAw?si=VncJaaHPaMvacecb",
    level: "junior",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-junior-2",
    title: "Vídeo: CiUumyrp7Ow",
    description: "Aula de Data Science recomendada para estudantes iniciantes.",
    thumbnail: "https://img.youtube.com/vi/CiUumyrp7Ow/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/CiUumyrp7Ow?si=8SXToQT287nar7UL",
    level: "junior",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-junior-3",
    title: "Vídeo: 7KhaiCC3fJQ",
    description: "Conteúdo prático para desenvolvedores Data Science iniciantes.",
    thumbnail: "https://img.youtube.com/vi/7KhaiCC3fJQ/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/7KhaiCC3fJQ?si=B6MGUKdlm0RMXMZS",
    level: "junior",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-pleno-1",
    title: "Vídeo: ovTM1mkmMl8",
    description: "Aula intermediária para desenvolvedores Data Science plenos.",
    thumbnail: "https://img.youtube.com/vi/ovTM1mkmMl8/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/ovTM1mkmMl8?si=ED0JwtwpfiYHqZK-",
    level: "pleno",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-pleno-2",
    title: "Vídeo: lVt70Bw2LlM",
    description: "Aula para aprofundar conhecimentos intermediários de Data Science.",
    thumbnail: "https://img.youtube.com/vi/lVt70Bw2LlM/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/lVt70Bw2LlM?si=jtai4-D5yxlLI1wc",
    level: "pleno",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-pleno-3",
    title: "Vídeo: r_FhT_hGieo",
    description: "Conteúdo prático para quem já trabalha com Data Science.",
    thumbnail: "https://img.youtube.com/vi/r_FhT_hGieo/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/r_FhT_hGieo?si=7obbdpPP2OIQcYFo",
    level: "pleno",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-senior-1",
    title: "Vídeo: FdbFRrcU4Y0",
    description: "Conteúdo sênior para desenvolvedores Data Science avançados.",
    thumbnail: "https://img.youtube.com/vi/FdbFRrcU4Y0/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/FdbFRrcU4Y0?si=M8La8NSRKPXNbz4o",
    level: "senior",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-senior-2",
    title: "Vídeo: LdrBPXBKoT8",
    description: "Aula avançada com foco em práticas Data Science modernas.",
    thumbnail: "https://img.youtube.com/vi/LdrBPXBKoT8/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/LdrBPXBKoT8?si=uJU-3440a6sA8Vrq",
    level: "senior",
    roadmapId: "datascience",
    channel: "YouTube"
  },
  {
    id: "ds-senior-3",
    title: "Vídeo: zsZyrWxVSSA",
    description: "Aula final para consolidar conhecimento Data Science sênior.",
    thumbnail: "https://img.youtube.com/vi/zsZyrWxVSSA/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/zsZyrWxVSSA?si=SWKZE8vsjJirfeo8",
    level: "senior",
    roadmapId: "datascience",
    channel: "YouTube"
  },

  // UI/UX
  {
    id: "ux-junior-1",
    title: "Vídeo: Dqp07aptOss",
    description: "Aula de UI/UX indicada para iniciantes em design.",
    thumbnail: "https://img.youtube.com/vi/Dqp07aptOss/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/Dqp07aptOss?si=Gv41ccRgf-cFuCwZ",
    level: "junior",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-junior-2",
    title: "Vídeo: jBJfrt4RLxA",
    description: "Aula recomendada para quem quer aprender UI/UX do zero.",
    thumbnail: "https://img.youtube.com/vi/jBJfrt4RLxA/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/jBJfrt4RLxA?si=6rsiZm_ae3Z-bxex",
    level: "junior",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-junior-3",
    title: "Vídeo: zkoGJXGfxFM",
    description: "Conteúdo prático para desenvolvedores UI/UX iniciantes.",
    thumbnail: "https://img.youtube.com/vi/zkoGJXGfxFM/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/zkoGJXGfxFM?si=i0P5n4OynV-a73Tg",
    level: "junior",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-pleno-1",
    title: "Vídeo: I-KcoQb6nTI",
    description: "Aula intermediária para desenvolvedores UI/UX plenos.",
    thumbnail: "https://img.youtube.com/vi/I-KcoQb6nTI/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/I-KcoQb6nTI?si=-cz1hkhOc5Xrd5pg",
    level: "pleno",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-pleno-2",
    title: "Vídeo: Yf8bgs84l2M",
    description: "Aula para aprofundar conhecimentos intermediários de UI/UX.",
    thumbnail: "https://img.youtube.com/vi/Yf8bgs84l2M/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/Yf8bgs84l2M?si=Rq5oduH0Fwz_lfWI",
    level: "pleno",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-pleno-3",
    title: "Vídeo: SJ6sTj-LCjA",
    description: "Conteúdo prático para quem já trabalha com UI/UX.",
    thumbnail: "https://img.youtube.com/vi/SJ6sTj-LCjA/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/SJ6sTj-LCjA?si=3OLYxPDEWFE8A9pp",
    level: "pleno",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-senior-1",
    title: "Vídeo: qOzpbBfgBSs",
    description: "Conteúdo sênior para desenvolvedores UI/UX avançados.",
    thumbnail: "https://img.youtube.com/vi/qOzpbBfgBSs/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/qOzpbBfgBSs?si=1EBHuNaWKUxDrV48",
    level: "senior",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-senior-2",
    title: "Vídeo: HkwYeVOClyU",
    description: "Aula avançada com foco em práticas UI/UX modernas.",
    thumbnail: "https://img.youtube.com/vi/HkwYeVOClyU/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/HkwYeVOClyU?si=Szl6tCzZFpg3Upu-",
    level: "senior",
    roadmapId: "uiux",
    channel: "YouTube"
  },
  {
    id: "ux-senior-3",
    title: "Vídeo: vpETwq8FO7U",
    description: "Aula final para consolidar conhecimento UI/UX sênior.",
    thumbnail: "https://img.youtube.com/vi/vpETwq8FO7U/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/vpETwq8FO7U?si=Ai8l63YgSuSyLTqX",
    level: "senior",
    roadmapId: "uiux",
    channel: "YouTube"
  },

  // Cloud
  {
    id: "cl-junior-1",
    title: "Vídeo: 97l0Ahu2efE",
    description: "Aula cloud indicada para iniciantes em infraestrutura.",
    thumbnail: "https://img.youtube.com/vi/97l0Ahu2efE/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/97l0Ahu2efE?si=KR7qRhNwLDcSqKMT",
    level: "junior",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-junior-2",
    title: "Vídeo: zaj0IX8dQwA",
    description: "Aula recomendada para quem quer aprender cloud do zero.",
    thumbnail: "https://img.youtube.com/vi/zaj0IX8dQwA/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/zaj0IX8dQwA?si=kjm_pxtM-JwTjk9D",
    level: "junior",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-junior-3",
    title: "Vídeo: uhXr9L57hOM",
    description: "Conteúdo prático para desenvolvedores cloud iniciantes.",
    thumbnail: "https://img.youtube.com/vi/uhXr9L57hOM/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/uhXr9L57hOM?si=vdIMKQMYli-7UgpH",
    level: "junior",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-pleno-1",
    title: "Vídeo: OeAVNKDkILM",
    description: "Aula intermediária para desenvolvedores cloud plenos.",
    thumbnail: "https://img.youtube.com/vi/OeAVNKDkILM/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/OeAVNKDkILM?si=CKgNHuSsEpwTQJBZ",
    level: "pleno",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-pleno-2",
    title: "Vídeo: KPHgZfFKTfg",
    description: "Aula para aprofundar conhecimentos intermediários de cloud.",
    thumbnail: "https://img.youtube.com/vi/KPHgZfFKTfg/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/KPHgZfFKTfg?si=l0hDdZhCuuurMpx8",
    level: "pleno",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-pleno-3",
    title: "Vídeo: b3X50P4vItA",
    description: "Conteúdo prático para quem já trabalha com cloud.",
    thumbnail: "https://img.youtube.com/vi/b3X50P4vItA/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/b3X50P4vItA?si=hicPceFviXJY1QOn",
    level: "pleno",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-senior-1",
    title: "Vídeo: gGCpQjzHjKY",
    description: "Conteúdo sênior para desenvolvedores cloud avançados.",
    thumbnail: "https://img.youtube.com/vi/gGCpQjzHjKY/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/gGCpQjzHjKY?si=noMUPnDJadfCWiAT",
    level: "senior",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-senior-2",
    title: "Vídeo: OlAmyf8_4O4",
    description: "Aula avançada com foco em práticas cloud modernas.",
    thumbnail: "https://img.youtube.com/vi/OlAmyf8_4O4/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/OlAmyf8_4O4?si=Hyw51aiRi7PYOwCn",
    level: "senior",
    roadmapId: "cloud",
    channel: "YouTube"
  },
  {
    id: "cl-senior-3",
    title: "Vídeo: tG1gzsHM5m8",
    description: "Aula final para consolidar conhecimento cloud sênior.",
    thumbnail: "https://img.youtube.com/vi/tG1gzsHM5m8/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/tG1gzsHM5m8?si=P47uqYFALEPm-sI2",
    level: "senior",
    roadmapId: "cloud",
    channel: "YouTube"
  },

  // Security
  {
    id: "se-junior-1",
    title: "Vídeo: oyR4hCJhwMU",
    description: "Aula de cybersecurity indicada para iniciantes.",
    thumbnail: "https://img.youtube.com/vi/oyR4hCJhwMU/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/oyR4hCJhwMU?si=BOq4ErMOyQpMEq2P",
    level: "junior",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-junior-3",
    title: "Vídeo: NBPOCB05o9E",
    description: "Conteúdo prático para desenvolvedores cybersecurity iniciantes.",
    thumbnail: "https://img.youtube.com/vi/NBPOCB05o9E/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/NBPOCB05o9E?si=TQniiiGPn2rsoEyV",
    level: "junior",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-pleno-1",
    title: "Vídeo: gpy_SiU2MFo",
    description: "Aula intermediária para desenvolvedores cybersecurity plenos.",
    thumbnail: "https://img.youtube.com/vi/gpy_SiU2MFo/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/gpy_SiU2MFo?si=N05hQoPL-O8es0k7",
    level: "pleno",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-pleno-2",
    title: "Vídeo: TW0rr6N2-WQ",
    description: "Aula para aprofundar conhecimentos intermediários de cybersecurity.",
    thumbnail: "https://img.youtube.com/vi/TW0rr6N2-WQ/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/TW0rr6N2-WQ?si=L_LzXgYnAE3gCgZF",
    level: "pleno",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-pleno-3",
    title: "Vídeo: s_VNa7cYG-g",
    description: "Conteúdo prático para quem já trabalha com cybersecurity.",
    thumbnail: "https://img.youtube.com/vi/s_VNa7cYG-g/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/s_VNa7cYG-g?si=275YUVEHLEg66o61",
    level: "pleno",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-senior-1",
    title: "Vídeo: kZ0DT-5dbuU",
    description: "Conteúdo sênior para desenvolvedores cybersecurity avançados.",
    thumbnail: "https://img.youtube.com/vi/kZ0DT-5dbuU/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/kZ0DT-5dbuU?si=sxWmkY86EV_h4mNi",
    level: "senior",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-senior-2",
    title: "Vídeo: Kx4y9c7w2JQ",
    description: "Aula avançada com foco em práticas cybersecurity modernas.",
    thumbnail: "https://img.youtube.com/vi/Kx4y9c7w2JQ/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/Kx4y9c7w2JQ?si=d2SU14Nw6HwEgyDr",
    level: "senior",
    roadmapId: "security",
    channel: "YouTube"
  },
  {
    id: "se-senior-3",
    title: "Vídeo: I9kXpuJa680",
    description: "Aula final para consolidar conhecimento cybersecurity sênior.",
    thumbnail: "https://img.youtube.com/vi/I9kXpuJa680/maxresdefault.jpg",
    youtubeUrl: "https://youtu.be/I9kXpuJa680?si=TaXTUmOwb59PN2Zw",
    level: "senior",
    roadmapId: "security",
    channel: "YouTube"
  }
];

export function getVideosByRoadmapAndLevel(roadmapId: string, level: "junior" | "pleno" | "senior") {
  return VIDEO_LESSONS.filter(video => video.roadmapId === roadmapId && video.level === level);
}

