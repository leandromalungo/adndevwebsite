import { callCloudFunction } from "../cloud-functions-client";

export type User = {
  id: string;
  name: string;
  email: string;
  country?: string;
  status: "active" | "banned" | "pending";
  joinDate?: string;
  role: "admin" | "user" | "editor";
  createdAt?: any;
};

/**
 * Busca usuários via Cloud Function
 */
export async function getUsers(): Promise<User[]> {
  return callCloudFunction<User[]>("getAdminUsers", "GET", undefined, true);
}

/**
 * Busca usuário por ID (filtrado da lista carregada ou via nova função se necessário)
 * Por agora, mantemos consistência buscando da lista ou poderíamos criar getAdminUserById
 */
export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => user.id === id);
}

/**
 * Atualiza status do usuário via Cloud Function
 */
export async function updateUserStatus(
  id: string,
  status: User["status"],
): Promise<{ success: boolean }> {
  return callCloudFunction("updateAdminUserStatus", "POST", { userId: id, status }, true);
}

