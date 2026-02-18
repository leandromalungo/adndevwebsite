import { z } from "zod";

/**
 * Esquema de validação para um Post (Artigo/Tutorial/Notícia)
 */
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

/**
 * Elimina um post (Simulado)
 * PONTO DE INTEGRAÇÃO: Substituir por chamada real à Cloud Function quando implementado no backend.
 */
export async function deletePost(id: string): Promise<void> {
  // Simulação de atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[AdminAPI] Post ${id} eliminado com sucesso (Simulado).`);
}
