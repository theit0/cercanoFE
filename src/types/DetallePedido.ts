import { Producto } from "./Producto";

export interface DetallePedido {
    id:number;
    cantidadProducto:number;
    subtotalPedido:number;
    producto:Producto;
}