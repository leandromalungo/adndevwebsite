import { callCloudFunction } from "../cloud-functions-client";

/**
 * Definição do tipo Utilizador para a Interface Administrativa
 */
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
 * Obtém a lista de todos os utilizadores através de uma Cloud Function
 * @returns Promessa com a lista de utilizadores
 */
export async function getUsers(): Promise<User[]> {
  return callCloudFunction<User[]>("getAdminUsers", "GET", undefined, true);
}

/**
 * Obtém os dados de um utilizador específico filtrando a lista carregada
 * @param id Identificador único do utilizador
 * @returns Promessa com o utilizador ou undefined
 */
export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => user.id === id);
}

/**
 * Atualiza o estado de um utilizador (ex: ativar, banir) através de uma Cloud Function
 * @param id Identificador do utilizador
 * @param status Novo estado pretendido
 * @returns Promessa com o resultado da operação
 */
export async function updateUserStatus(
  id: string,
  status: User["status"],
): Promise<{ success: boolean }> {
  return callCloudFunction("updateAdminUserStatus", "POST", { userId: id, status }, true);
}
