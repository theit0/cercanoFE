import axios from "axios";
import { Categoria } from "../../../types/Categoria";


export const CategoriaRequests = {
    
    getCategorias: async (): Promise<Categoria[]> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/categoria/busquedaPorAltaCat`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching categorias: " + error);
        }
    },

    getCategoria: async (id: number): Promise<Categoria> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/categoria/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching categoria: " + error);
        }
    },

    createCategoria: async (cat: Categoria, token: string): Promise<Categoria> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/categoria`, cat, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error creating categoria: " + error);
        }
    },

    updateCategoria: async (id: number, cat: Categoria, token: string): Promise<Categoria> => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/categoria/${id}`, cat, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error updating categoria: " + error);
        }
    },

    deleteCategoria: async (id: number, cat: Categoria, token: string): Promise<void> => {
        try {
            const fechaBaja = new Date();
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/categoria/${id}`, { ...cat, fechaBaja }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error deleting categoria: " + error);
        }
    },
};

