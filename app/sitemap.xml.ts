"use server";

import { getCategories } from "@/data-access/get-categories";
import { getQuizzes } from "@/data-access/get-quizzes";
import { getWords } from "@/data-access/get-words";
import type { MetadataRoute } from "next";

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

type StaticPageConfig = {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
  lastModified?: Date;
};

const BASE_URL = "https://dicionarioangolano.com/";
const NAKED_URL = "https://dicionarioangolano.com";

const normalizeUrl = (url: string): string => {
  return url.endsWith("/") ? url : `${url}/`;
};

const baseUrl = normalizeUrl(BASE_URL);

const staticPagesConfig: StaticPageConfig[] = [
  {
    path: "",
    priority: 1.0,
    changeFrequency: "daily",
    lastModified: new Date(),
  },
  {
    path: "words",
    priority: 0.9,
    changeFrequency: "daily",
  },
  {
    path: "quiz",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "about-us",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "contact",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "api",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "privacy-policy",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "cookie-policy",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "terms-of-use",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "disclaimer",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    path: "transparency",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "faq",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "search",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "statistics",
    priority: 0.6,
    changeFrequency: "weekly",
  },
  {
    path: "contribute",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "content-policy",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "potential-policy-violations",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "editorial-guidelines",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "educational-resources",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "study-guides",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "exercises",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "teacher-resources",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "contribute",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "language-history",
    priority: 0.7,
    changeFrequency: "monthly",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const currentDate = new Date();

    const staticPages: SitemapEntry[] = staticPagesConfig.map(
      ({ path, priority, changeFrequency, lastModified }) => ({
        url: path === "" ? NAKED_URL : `${baseUrl}${path}`,
        lastModified: lastModified || currentDate,
        changeFrequency,
        priority,
      }),
    );

    const [wordsData, categoriesData, quizzes] = await Promise.all([
      getWords(),
      getCategories(),

      Promise.resolve(getQuizzes()),
    ]);

    const wordPages: SitemapEntry[] = wordsData.words.map(({ word }) => ({
      url: `${baseUrl}word/${encodeURIComponent(word)}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

    const wordCategoryPages: SitemapEntry[] = categoriesData.categories.map(
      (category) => ({
        url: `${baseUrl}category/${encodeURIComponent(category)}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }),
    );

    const quizPages: SitemapEntry[] = quizzes.quizzes.map((quiz) => ({
      url: `${baseUrl}quiz/${quiz.slug}`,
      lastModified: quiz.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const allPages: SitemapEntry[] = [
      ...staticPages,
      ...wordPages,

      ...wordCategoryPages,
      ...quizPages,
    ].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return allPages;
  } catch (error) {
    console.error("Error generating sitemap:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return [
      {
        url: NAKED_URL,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
    ];
  }
}
