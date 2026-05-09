"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    throw new Error("Sem permissao.");
  }
}

function revalidateContentPaths() {
  revalidatePath("/events");
  revalidatePath("/bolsas");
  revalidatePath("/community");
  revalidatePath("/k7M2pQ9xL4nT/content");
  revalidatePath("/k7M2pQ9xL4nT/content/ver");
}

export async function createAdminEvent(formData: FormData) {
  await ensureAdmin();

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date_label: String(formData.get("date_label") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    organizer: String(formData.get("organizer") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    is_published: true,
    created_at: new Date().toISOString(),
  };

  if (
    !payload.title ||
    !payload.description ||
    !payload.date_label ||
    !payload.location ||
    !payload.country ||
    !payload.category ||
    !payload.organizer ||
    !payload.link ||
    !payload.image_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link do evento deve ser uma URL valida.");
  }

  if (!payload.image_url.startsWith("http")) {
    throw new Error("URL da imagem deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_events").insert([payload]);
  revalidateContentPaths();
}

export async function createAdminScholarship(formData: FormData) {
  await ensureAdmin();

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    level: String(formData.get("level") ?? "").trim(),
    deadline: String(formData.get("deadline") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    is_published: true,
    created_at: new Date().toISOString(),
  };

  if (
    !payload.title ||
    !payload.description ||
    !payload.country ||
    !payload.level ||
    !payload.deadline ||
    !payload.link ||
    !payload.image_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link da bolsa deve ser uma URL valida.");
  }

  if (!payload.image_url.startsWith("http")) {
    throw new Error("URL da imagem deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_scholarships").insert([payload]);
  revalidateContentPaths();
}

export async function createAdminCommunity(formData: FormData) {
  await ensureAdmin();

  const categoriesRaw = formData.getAll("categories");
  const categories = categoriesRaw.length > 0 ? categoriesRaw : [];

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    category: categories.length > 0 ? categories.join(", ") : "",
    location: String(formData.get("location") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    logo_url: String(formData.get("logo_url") ?? "").trim(),
    is_published: true,
    created_at: new Date().toISOString(),
  };

  if (
    !payload.name ||
    !payload.description ||
    !payload.country ||
    !payload.category ||
    !payload.location ||
    !payload.link ||
    !payload.logo_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link da comunidade deve ser uma URL valida.");
  }

  if (!payload.logo_url.startsWith("http")) {
    throw new Error("URL do logo deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_communities").insert([payload]);
  revalidateContentPaths();
}

export async function updateAdminEvent(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date_label: String(formData.get("date_label") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    organizer: String(formData.get("organizer") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    is_published: String(formData.get("is_published") ?? "") === "on",
  };

  if (
    !payload.title ||
    !payload.description ||
    !payload.date_label ||
    !payload.location ||
    !payload.country ||
    !payload.category ||
    !payload.organizer ||
    !payload.link ||
    !payload.image_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link do evento deve ser uma URL valida.");
  }

  if (!payload.image_url.startsWith("http")) {
    throw new Error("URL da imagem deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_events").update(payload).eq("id", id);
  revalidateContentPaths();
}

export async function updateAdminScholarship(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    level: String(formData.get("level") ?? "").trim(),
    deadline: String(formData.get("deadline") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    image_url: String(formData.get("image_url") ?? "").trim(),
    is_published: String(formData.get("is_published") ?? "") === "on",
  };

  if (
    !payload.title ||
    !payload.description ||
    !payload.country ||
    !payload.level ||
    !payload.deadline ||
    !payload.link ||
    !payload.image_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link da bolsa deve ser uma URL valida.");
  }

  if (!payload.image_url.startsWith("http")) {
    throw new Error("URL da imagem deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_scholarships").update(payload).eq("id", id);
  revalidateContentPaths();
}

export async function updateAdminCommunity(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  const categoriesRaw = formData.getAll("categories");
  const categories = categoriesRaw.length > 0 ? categoriesRaw : [];

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    category: categories.length > 0 ? categories.join(", ") : "",
    location: String(formData.get("location") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    logo_url: String(formData.get("logo_url") ?? "").trim(),
    is_published: String(formData.get("is_published") ?? "") === "on",
  };

  if (
    !payload.name ||
    !payload.description ||
    !payload.country ||
    !payload.category ||
    !payload.location ||
    !payload.link ||
    !payload.logo_url
  ) {
    throw new Error("Preencha todos os campos obrigatorios.");
  }

  if (!payload.link.startsWith("http")) {
    throw new Error("Link da comunidade deve ser uma URL valida.");
  }

  if (!payload.logo_url.startsWith("http")) {
    throw new Error("URL do logo deve ser uma URL valida.");
  }

  await supabaseAdmin.from("admin_communities").update(payload).eq("id", id);
  revalidateContentPaths();
}

export async function deleteAdminEvent(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  await supabaseAdmin.from("admin_events").delete().eq("id", id);
  revalidateContentPaths();
}

export async function deleteAdminScholarship(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  await supabaseAdmin.from("admin_scholarships").delete().eq("id", id);
  revalidateContentPaths();
}

export async function deleteAdminCommunity(formData: FormData) {
  await ensureAdmin();
  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID invalido.");

  await supabaseAdmin.from("admin_communities").delete().eq("id", id);
  revalidateContentPaths();
}
