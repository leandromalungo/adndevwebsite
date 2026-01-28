import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  getFirestore,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { COLLECTION_CLIENTS } from "@/lib/constants";
import { ClientType } from "@/lib/clientType";
import { db } from "@/lib/firebase";



export class ClientDao {
  static shared = new ClientDao();

  async getClientById(id: string): Promise<ClientType | null> {
  try {
    const docRef = doc(db, COLLECTION_CLIENTS, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as ClientType;
    } else {
      console.warn("Nenhum projeto encontrado com o ID:", id);
      return null;
    }

  } catch (error) {
    console.error("Erro ao buscar o projeto:", error);
    throw error; 
  }
}

  getClientByEmail(email: string): Promise<ClientType> {
      return new Promise((resolve, reject) => {
        const collRef = collection(getFirestore(), COLLECTION_CLIENTS);
        const q = query(collRef, where("email", "==", email));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              reject();
            } else {
              querySnapshot.docs.forEach((docs) => {
                const Client = docs.data() as ClientType;
                resolve(Client);
              });
            }
          })
          .catch(reject);
      });
    }

    async getAllClients(): Promise<ClientType[]> {
      try {
        const colRef = collection(db, COLLECTION_CLIENTS);
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ClientType[];
      } catch (error) {
        console.error("Erro ao buscar todos os projetos:", error);
        throw error;
      }
    }

  async createClient(data: ClientType, file?: File): Promise<string> {
    try {

      const colRef = collection(db, COLLECTION_CLIENTS);

      const ClientToCreate = {
        ...data,
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      const docRef = doc(colRef);
      const ClientWithId = {
        ...ClientToCreate,
        id: docRef.id,
      };

      await setDoc(docRef, ClientWithId);

      console.log("[ClientsDao] createClient - created", docRef.id, ClientWithId);

      return docRef.id;
      
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      throw error;
    }
  }

  async updateClient(
    id: string,
    data: Partial<ClientType>,
    file?: File
  ): Promise<void> {
    try {
      // Se houver ficheiro, faz upload e atualiza imageUr

      const ClientToUpdate = {
        ...data,
        updatedAt: new Date(),
      };

      const docRef = doc(db, COLLECTION_CLIENTS, id);
      await setDoc(docRef, ClientToUpdate, { merge: true });

      console.log("[ClientsDao] updateClient - updated", id, ClientToUpdate);
    } catch (error) {
      console.error("Erro ao atualizar Cliento:", error);
      throw error;
    }
  }


  deleteClient(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, COLLECTION_CLIENTS, id);
      deleteDoc(docRef)
        .then(() => resolve())
        .catch(reject);
    });
  }
}

