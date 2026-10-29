/**
 * SCHEMAS ZOD - VALIDAÇÃO CENTRALIZADA
 * 
 * Usado em FRONTEND e BACKEND para garantir dados seguros.
 * Previne SQL injection, XSS, e input malicioso.
 */

import { z } from 'zod';
import { sanitizeText, sanitizeHtml, sanitizeUrl } from '@/lib/sanitization';

// ===== AUTH SCHEMAS =====

export const UserRegistrationSchema = z.object({
  name: z.string()
    .min(3, "Username muito curto (mín. 3 caracteres)")
    .max(50, "Username muito longo (máx. 50 caracteres)")
    .regex(/^[a-zA-Z0-9._]+$/, "Username só pode conter letras, números, pontos e underscores (sem espaços)"),

  email: z.string()
    .email('Email inválido')
    .max(254, 'Email muito longo')
    .transform((email) => email.toLowerCase().trim()),

  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(128, 'Máximo 128 caracteres')
    .regex(/[A-Z]/, 'Mínimo 1 letra MAIÚSCULA')
    .regex(/[a-z]/, 'Mínimo 1 letra minúscula')
    .regex(/[0-9]/, 'Mínimo 1 número'),

  telegram: z.string()
    .regex(/^@[a-zA-Z0-9_]{5,32}$/, 'Handle Telegram inválido (ex: @seuusuario)')
    .or(z.literal(''))
    .optional(),

  country: z.string().max(100).optional(),
  it_area: z.string().max(100).optional(),
  it_role: z.string().max(100).optional(),
});

export const UserLoginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .transform((email) => email.toLowerCase().trim()),

  password: z.string().min(1, 'Password é obrigatória'),
});

// ===== PROFILE SCHEMAS =====

export const UpdateProfileSchema = z.object({
  bio: z.string()
    .max(400, 'Bio pode ter no máximo 400 caracteres')
    .transform((val) => sanitizeText(val))
    .optional(),

  phone: z.string()
    .max(20, 'Telefone inválido')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Telefone contém caracteres inválidos')
    .transform((val) => sanitizeText(val))
    .or(z.literal(''))
    .optional(),

  whatsapp: z.string().max(20).optional(),

  telegram: z.string()
    .regex(/^@[a-zA-Z0-9_]{5,32}$/, 'Handle Telegram inválido')
    .or(z.literal(''))
    .optional(),

  country: z.string().max(100).optional(),
  it_area: z.string().max(100).optional(),
  it_role: z.string().max(100).optional(),

  username: z.string()
    .min(3, "Username muito curto (mín. 3 caracteres)")
    .max(50, "Username muito longo (máx. 50 caracteres)")
    .regex(/^[a-zA-Z0-9._]+$/, "Username só pode conter letras, números, pontos e underscores (sem espaços)")
    .or(z.literal(''))
    .optional(),
});

// ===== SKILL SCHEMAS =====

export const AddSkillSchema = z.object({
  skill: z.string()
    .min(2, 'Skill muito curto')
    .max(100, 'Skill muito longo')
    .regex(/^[a-zA-Z0-9\s\-\+\.\/\#]+$/, 'Skill contém caracteres inválidos')
    .trim(),
});

// ===== EXPERIENCE SCHEMAS =====

export const AddExperienceSchema = z.object({
  role: z.string()
    .min(2, 'Role muito curto')
    .max(255, 'Role muito longo')
    .trim()
    .transform((val) => sanitizeText(val)),

  company: z.string()
    .min(2, 'Company muito curto')
    .max(255, 'Company muito longo')
    .trim()
    .transform((val) => sanitizeText(val)),

  period: z.string()
    .max(100, 'Period muito longo')
    .trim()
    .transform((val) => sanitizeText(val))
    .optional(),

  description: z.string()
    .max(1000, 'Description muito longa')
    .trim()
    .transform((val) => sanitizeText(val))
    .optional(),
});

// ===== CERTIFICATION SCHEMAS =====

export const AddCertificationSchema = z.object({
  name: z.string()
    .min(1, 'Nome da certificação obrigatório')
    .max(255, 'Nome muito longo'),

  issuer: z.string()
    .max(255, 'Issuer muito longo')
    .optional(),

  issue_date: z.string()
    .datetime()
    .optional(),

  expiry_date: z.string()
    .datetime()
    .optional(),
});

// ===== PROJECT SCHEMAS =====

export const AddProjectSchema = z.object({
  name: z.string()
    .min(2, 'Nome do projeto muito curto')
    .max(255, 'Nome muito longo')
    .transform((val) => sanitizeText(val))
    .optional(),

  description: z.string()
    .max(1000, 'Description muito longa')
    .transform((val) => sanitizeText(val))
    .optional(),

  url: z.string()
    .url('URL do projeto inválida')
    .max(500, 'URL muito longa')
    .transform((val) => sanitizeUrl(val))
    .optional(),
});

// ===== SUBSCRIPTION SCHEMAS =====

export const SubscriptionSchema = z.object({
  name: z.string()
    .min(2, "Nome curto demais")
    .max(100, "Nome longo demais")
    .refine(
      (val) => !/<[^>]*>/.test(val),
      "HTML tags não permitidas"
    )
    .transform((val) => sanitizeText(val)),

  email: z.string()
    .email("Email inválido")
    .max(254, "Email muito longo")
    .transform((email) => email.toLowerCase().trim()),

  telegram: z.string()
    .regex(/^@[a-zA-Z0-9_]{5,32}$/, "Handle Telegram inválido")
    .or(z.literal(''))
    .optional()
    .transform((val) => val ? sanitizeText(val) : val),

  it_area: z.string()
    .min(1, "Área de atuação obrigatória")
    .max(100, "Área muito longa")
    .transform((val) => sanitizeText(val)),

  it_role: z.string()
    .min(1, "Função obrigatória")
    .max(100, "Função muito longa")
    .transform((val) => sanitizeText(val)),
});

// ===== ADMIN PUBLICATION SCHEMAS =====

export const EventPublicationSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(10, "Descrição detalhada é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  location: z.string().min(1, "Localização ou link de reunião é obrigatório"),
  imageUrl: z.string().url("URL da foto é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  organizer: z.string().min(2, "Nome do organizador é obrigatório"),
});

export const ScholarshipPublicationSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  entity: z.string().min(2, "Entidade provedora é obrigatória"),
  description: z.string().min(10, "Descrição é obrigatória"),
  link: z.string().url("Link oficial é obrigatório"),
  imageUrl: z.string().url("URL da foto é obrigatória"),
  deadline: z.string().min(1, "Prazo de candidatura é obrigatório"),
});

export const CommunityPublicationSchema = z.object({
  name: z.string().min(2, "Nome da comunidade é obrigatório"),
  description: z.string().min(10, "Descrição é obrigatória"),
  link: z.string().url("Link de convite é obrigatório"),
  logoUrl: z.string().url("URL do logo é obrigatória"),
  categories: z.array(z.string()).min(1, "Pelo menos uma categoria é obrigatória").optional(),
});

// ===== SECURITY MONITORING SCHEMAS =====

export const RateLimitLogSchema = z.object({
  endpoint: z.string(),
  ip_address: z.string().ip(),
  occurrence_count: z.number(),
  timestamp: z.string().datetime(),
});

export const AttackLogSchema = z.object({
  attack_type: z.enum(["SQLi", "XSS", "Brute Force", "DDoS", "Malicious Payload"]),
  attacker_ip: z.string().ip(),
  location: z.string().min(1, "Localização é obrigatória"),
  user_agent: z.string(),
  timestamp: z.string().datetime(),
});

// ===== TYPE EXPORTS =====

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type AddSkill = z.infer<typeof AddSkillSchema>;
export type AddExperience = z.infer<typeof AddExperienceSchema>;
export type AddCertification = z.infer<typeof AddCertificationSchema>;
export type AddProject = z.infer<typeof AddProjectSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type EventPublication = z.infer<typeof EventPublicationSchema>;
export type ScholarshipPublication = z.infer<typeof ScholarshipPublicationSchema>;
export type CommunityPublication = z.infer<typeof CommunityPublicationSchema>;
