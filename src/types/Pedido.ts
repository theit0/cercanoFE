import { DetallePedido } from "./DetallePedido";
import { EstadoPedido } from "./EstadoPedido";
import { TipoEnvio } from "./TipoEnvio";

export interface Pedido{
    id:number;
    fechaHoraPedido:Date;
    fechaHoraBajaPedido:Date;
    nombreCliente:string;
    apellidoCliente:string;
    telefonoCliente:string;
    direccionEntrega:string;
    tipoEnvio: TipoEnvio;
    demora:number | null;
    costoDelivery:number | null;
    estadoPedido: EstadoPedido | null;
    montoTotal:number;
    detalles:DetallePedido[];
}