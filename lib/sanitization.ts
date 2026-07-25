import DOMPurify from 'dompurify';

// Fallback para server-side sem jsdom
const createDOMPurify = () => {
  // Para server-side, usamos uma implementação mais simples
  if (typeof window === 'undefined') {
    return {
      sanitize: (html: string, options?: any) => {
        // Remove todas as tags HTML e mantém apenas texto
        return html.replace(/<[^>]*>/g, '').trim();
      }
    };
  }
  return DOMPurify;
};

const purify = createDOMPurify();

/**
 * Sanitiza texto removendo tags HTML e caracteres perigosos
 * Mantém apenas texto seguro
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Remove todas as tags HTML
  const cleanText = text.replace(/<[^>]*>/g, '');

  // Remove caracteres de controle e scripts
  return cleanText
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove caracteres de controle
    .replace(/javascript:/gi, '') // Remove protocolos javascript
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/on\w+='[^']*'/gi, '') // Remove event handlers com aspas simples
    .trim();
}

/**
 * Sanitiza HTML básico permitindo apenas tags seguras
 * Usado para campos que podem conter formatação simples
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';

  // Para server-side, remove todas as tags HTML por segurança
  // No client-side, poderia usar DOMPurify se necessário
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitiza URL removendo protocolos perigosos
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';

  const cleanUrl = url.trim();

  // Bloqueia protocolos perigosos
  if (cleanUrl.match(/^(javascript|data|vbscript):/i)) {
    return '';
  }

  // Permite apenas http, https, mailto, tel
  if (!cleanUrl.match(/^(https?:\/\/|mailto:|tel:)/i)) {
    return `https://${cleanUrl}`;
  }

  return cleanUrl;
}