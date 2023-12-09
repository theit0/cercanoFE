import { Producto } from "./Producto";

export interface DetallePedido {
    cantidadProducto:number;
    subtotalPedido:number;
    producto:Producto;
}