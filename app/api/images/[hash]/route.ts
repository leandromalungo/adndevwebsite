import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import sharp from "sharp";
import { Redis } from "@upstash/redis";

// Inicialização do Redis
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * API Route para servir imagens privadas com redimensionamento e auditoria.
 * URL: /api/images/[hash]?w=500&h=300&q=80
 */

// export const runtime = "edge"; // Revertido: sharp e fs requerem Node.js runtime

// Caminho para a pasta privada de imagens
const STORAGE_DIR = path.join(process.cwd(), "storage", "images");

// Carregamento do mapeamento hash -> filename
let IMAGE_MAPPING: Record<string, string> = {};
try {
    const mappingPath = path.join(process.cwd(), "storage", "mapping.json");
    const mappingData = fsSync.readFileSync(mappingPath, "utf-8");
    IMAGE_MAPPING = JSON.parse(mappingData);
} catch (e) {
    console.warn("[Storage] Mapping não encontrado, usando fallback vazio.");
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ hash: string }> }
) {
    const { hash } = await params;
    console.log(">>> [DEBUG] API Images route hit with hash:", hash, "URL:", request.url);
    const { searchParams } = new URL(request.url);

    const width = parseInt(searchParams.get("w") || "0");
    const height = parseInt(searchParams.get("h") || "0");
    const quality = parseInt(searchParams.get("q") || "80");

    // 🔄 Em desenvolvimento, recarrega o mapeamento para detectar novas imagens sem restart
    if (process.env.NODE_ENV === "development") {
        try {
            const mappingPath = path.join(process.cwd(), "storage", "mapping.json");
            const mappingData = fsSync.readFileSync(mappingPath, "utf-8");
            IMAGE_MAPPING = JSON.parse(mappingData);
        } catch (e) {
            console.error("[Storage] Falha ao recarregar mapping em dev.");
        }
    }

    try {
        const lowerHash = hash.toLowerCase();
        let filename = IMAGE_MAPPING[hash] || IMAGE_MAPPING[lowerHash];

        // Fallback: se o mapeamento não tiver a chave, e o hash parece ser um ficheiro (sem subpastas), tenta usá-lo
        if (!filename && /^[a-zA-Z0-9.\-_]+$/.test(hash)) {
            filename = hash;
        }

        if (!filename) {
            console.warn(`[Storage] 404: Hash "${hash}" não encontrado no mapeamento. Disponíveis:`, Object.keys(IMAGE_MAPPING).slice(0, 10), "...");
            return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });
        }

        const filePath = path.join(STORAGE_DIR, filename);

        // Verifica se o arquivo existe
        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json({ error: "Ficheiro físico não encontrado" }, { status: 404 });
        }

        // Incrementa contador de acessos
        if (redis) {
            try {
                await redis.incr(`img_access:${hash}`);
            } catch (redisError) {
                console.error("[Storage] Erro ao incrementar no Redis:", redisError);
            }
        }

        // Lê a imagem
        const fileBuffer = await fs.readFile(filePath);

        let transformer = sharp(fileBuffer);

        // Redimensionamento se necessário
        if (width > 0 || height > 0) {
            if (width > 0 && height > 0) {
                transformer = transformer.resize(width, height, { fit: "cover" });
            } else if (width > 0) {
                transformer = transformer.resize(width);
            } else if (height > 0) {
                transformer = transformer.resize(null, height);
            }
        }

        transformer = transformer.webp({ quality });
        const imageBuffer = await transformer.toBuffer();

        // ⚡ Edge Runtime: criar Uint8Array direto para NextResponse
        const body = new Uint8Array(imageBuffer);

        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type": "image/webp",
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Image-Hash": hash,
            },
        });

    } catch (error: any) {
        console.error(`[Storage] Erro ao processar imagem ${hash}:`, error.message);
        return NextResponse.json({ error: "Erro interno ao processar imagem" }, { status: 500 });
    }
}
