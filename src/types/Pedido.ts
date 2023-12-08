import { EstadoPedido } from "./EstadoPedido";
import { TipoEnvio } from "./TipoEnvio";

export interface Pedido{
    id:number;
    fechaHoraPedido:string;
    fechaHoraBajaPedido:string;
    nombreCliente:string;
    apellidoCliente:string;
    telefonoCliente:number;
    direccionEntrega:string;
    tipoEnvio: TipoEnvio;
    demora:number;
    costoDelivery:number;
    estadoPedido: EstadoPedido;
    montoTotal:number;
}