export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "active" | "banned" | "pending";
  joinDate: string;
  role: "admin" | "user" | "editor";
};

// Lista simulada de usuários. PONTO DE INTEGRAÇÃO: Em produção, faça fetch para o backend real.
// Aqui usamos um JSON local para simular o backend.
import usersJson from "../../data/mockUsers.json";
const users: User[] = usersJson as unknown as User[];

// Busca usuários (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
export async function getUsers(): Promise<User[]> {
  // Busca usuários (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return users;
}

// Busca usuário por ID (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
export async function getUserById(id: string): Promise<User | undefined> {
  // Busca usuário por ID (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return users.find((user) => user.id === id);
}

// Atualiza status do usuário (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
export async function updateUserStatus(
  // Atualiza status do usuário (simulado). PONTO DE INTEGRAÇÃO: Troque por chamada real ao backend.
  id: string,
  status: User["status"],
): Promise<User | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = users.find((u) => u.id === id);
  if (user) {
    user.status = status;
  }
  return user;
}
