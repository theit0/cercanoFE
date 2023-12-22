import { DetallePedido } from "./DetallePedido";
import { EstadoPedido } from "./EstadoPedido";
import { TipoEnvio } from "./TipoEnvio";

export interface Pedido{
    id:string;
    fechaHoraPedido:Date;
    fechaHoraBajaPedido:Date;
    nombreCliente:string;
    apellidoCliente:string;
    telefonoCliente:string;
    direccionEntrega:string;
    tiempoEntrega:number;
    tipoEnvio: TipoEnvio;
    demora:number | null;
    costoDelivery:number | null;
    estadoPedido: EstadoPedido ;
    montoTotal:number;
    detalles:DetallePedido[];
}