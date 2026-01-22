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

