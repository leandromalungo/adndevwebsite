import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  subject: z.string(),
  type: z.enum(["article", "tutorial", "news"]),
  country: z.string(),
  status: z.enum(["published", "draft", "archived"]),
  author: z.string(),
  createdAt: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

// Deleta post (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
export async function deletePost(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Simulação de exclusão
}
