// store/ClientStore.ts
import { create } from "zustand";
import { ClientType } from "@/lib/clientType";
import { ClientDao } from "./ClientDAO";


const ClientDAO = ClientDao.shared;

type ClientState = {
  Clients: ClientType[];
  Client: ClientType | null;
  loading: boolean;
  error: string | null;

  fetchAllClients: () => Promise<void>;
  fetchClientById: (id: string) => Promise<void>;
  createNewClient: (data: ClientType, file?: File | null) => Promise<void>;
  updateExistingClient: (id: string, data: Partial<ClientType>, file: File) => Promise<void>;
  deleteClientById: (id: string) => Promise<void>;
};

export const useClientStore = create<ClientState>((set, get) => ({
  Clients: [],
  Client: null,
  loading: false,
  error: null,

  // 🔹 GET ALL
  fetchAllClients: async () => {
    set({ loading: true, error: null });
    try {
      const Clients = await ClientDAO.getAllClients();
      set({ Clients, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 GET BY ID
  fetchClientById: async (id) => {
    set({ loading: true, error: null });
    try {
      const Client = await ClientDAO.getClientById(id);
      set({ Client, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 CREATE
  createNewClient: async (data, file) => {
    set({ loading: true, error: null });
    try {
      console.log("[ClientRepository] createNewClient called", { data, file });
      await ClientDAO.createClient(data, file as File);
      await get().fetchAllClients(); // Atualiza a lista
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 UPDATE
  updateExistingClient: async (id, data, file) => {
    set({ loading: true, error: null });
    try {
      await ClientDAO.updateClient(id, data, file);
      await get().fetchAllClients(); // Atualiza a lista
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 DELETE
  deleteClientById: async (id) => {
    set({ loading: true, error: null });
    try {
      await ClientDAO.deleteClient(id);
      await get().fetchAllClients(); // Atualiza a lista
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
