import axios from "axios";
import { Producto } from "../../../types/Producto";

export const ProductoRequests = {
    
    getProductos: async (): Promise<Producto[]> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/producto/busquedaPorAlta`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching productos: " + error);
        }
    },
    
    getProducto: async (id: number): Promise<Producto> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/producto/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching producto: " + error);
        }
    },

    getCatProds: async (idCategoria: number): Promise<Producto[]> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/producto/busquedaPorCategoria?idCategoria=${idCategoria}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching producto: " + error);
        }
    },

    createProducto: async (prod: Producto, token: string): Promise<Producto> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/producto`, prod, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error creating producto: " + error);
        }
    },

    updateProducto: async (id: number, prod: Producto, token: string): Promise<Producto> => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/producto/${id}`, prod, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error updating producto: " + error);
        }
    },

    deleteProducto: async (id: number, prod: Producto, token: string): Promise<void> => {
        try {
            const fechaBaja = new Date();
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/producto/${id}`, { ...prod, fechaBaja }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error deleting producto: " + error);
        }
    },
};

