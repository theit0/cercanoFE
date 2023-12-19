import axios from "axios";
import { Pedido } from "../../../types/Pedido";


export const PedidoRequests = {
    
    getPedidos: async (token: string): Promise<Pedido[]> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/pedidos/buscarPedidos`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error fetching pedidos: " + error);
        }
    },
    
    getPedido: async (id: string): Promise<Pedido> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/pedidos/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching pedido: " + error);
        }
    },

    createPedido: async (pedido: Pedido, token: string): Promise<Pedido> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/pedidos`, pedido, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error creating pedido: " + error);
        }
    },

    realizarPedido: async (pedido: Pedido): Promise<Pedido> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/pedidos/realizarPedido`, pedido);
            return response.data;
        } catch (error) {
            throw new Error("Error creating pedido: " + error);
        }
    },

    updatePedido: async (id: number, pedido: Pedido, token: string): Promise<Pedido> => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/pedidos/${id}`, pedido, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error updating pedido: " + error);
        }
    },

    deletePedido: async (id: number, pedido: Pedido, token: string): Promise<void> => {
        try {
            const fechaBaja = new Date();
            const response = await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/pedidos/${id}`, { ...pedido, fechaBaja }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error deleting pedido: " + error);
        }
    },
};

