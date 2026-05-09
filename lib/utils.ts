/**
 * UTILITÁRIOS E FUNÇÕES HELPER
 * 
 * Este arquivo contém funções reutilizáveis em todo o projeto.
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Função cn (className merge)
 * 
 * Combina classes CSS com suporte a Tailwind CSS.
 * Resolve conflitos entre classes Tailwind (ex: width conflitando).
 * 
 * Exemplo:
 * cn('px-2', 'px-4') // resultado: 'px-4' (a última prevalece)
 * cn('p-2', ['p-4', { 'px-8': true }]) // resultado: 'p-4 px-8'
 * 
 * @param inputs - Valores de classe (string, array, objeto)
 * @returns String com classes CSS mergeadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converte uma string para um slug URL-friendly.
 * Ex: "Desenvolvedor Full Stack" -> "desenvolvedor-full-stack"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove caracteres não-alfanuméricos
    .replace(/\-\-+/g, '-') // Substitui múltiplos hífens por um único
    .replace(/^-+/, '') // Remove hífens do início
    .replace(/-+$/, ''); // Remove hífens do fim
}
