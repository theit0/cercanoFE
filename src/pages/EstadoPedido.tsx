import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PedidoRequests } from "../services/Requests/PedidoRequests/PedidoRequests";
import { Pedido } from "../types/Pedido";
import "./styles/EstadoPedido.css"
import { Spinner } from "react-bootstrap";
import ConfirmarButton from "../components/ConfirmarButton/ConfirmarButton";

const EstadoPedido = () => {
  const { id } = useParams();

  const [pedido, setPedido] = useState<Pedido>();

  useEffect(()=>{
    const fetchPedido = async () => {
      if (id) { // Verifica si id tiene un valor antes de hacer la solicitud
        const pedido = await PedidoRequests.getPedido(id);
        setPedido(pedido);
      }
    };
    fetchPedido();
  },[id])


  const confirmarPedido = async () => {
      if (id) { // Verifica si id tiene un valor antes de hacer la solicitud
        const pedidoConfirmado = await PedidoRequests.confirmarPedido(id);
        setPedido(pedidoConfirmado);
      }
  }

  const cancelarPedido = async () => {
    if (id) { // Verifica si id tiene un valor antes de hacer la solicitud
      const pedidoConfirmado = await PedidoRequests.cancelarPedido(id);
      setPedido(pedidoConfirmado);
    }
  }

  return (
    <div className="estado-pedido">
      { pedido && pedido.estadoPedido.nombre === "EN_ESPERA" ? (
        
        <div className="seccion-estado">
          <h1>PEDIDO EN ESPERA</h1>
          <h3>{`${pedido.nombreCliente}, POR FAVOR NO ABANDONE LA PÁGINA.`}</h3>
          <h4>En instantes se le confirmará si su pedido puede ser preparado.</h4>
          <Spinner />
        </div>


      ) : pedido && pedido.estadoPedido.nombre === "ACEPTADO" ? (
          <div className="seccion-estado">
            <h1>SU PEDIDO FUE ACEPTADO</h1>
            {
              pedido.tipoEnvio === "DELIVERY" ?
              <div className="seccion-estado">
                <h3>{`Dirección: ${ pedido.direccionEntrega}`}</h3>
                <h3>{`Tiempo estimado de llegada: ${ pedido.demora} minutos.`}</h3>
                <h3>{`Costo delivery: $${ pedido.costoDelivery}`}</h3>
                <h3 style={{textDecoration:"underline"}}>¿Desea confirmar el pedido?</h3>
                <div className="d-flex gap-2">
                    <ConfirmarButton onClick={()=>confirmarPedido()}>Confirmar</ConfirmarButton>
                    <ConfirmarButton onClick={()=>cancelarPedido()}>Cancelar</ConfirmarButton>
                </div>
              </div>
              :
              //TAKEAWAY
              (
                <div>
                  <h3>{`Tiempo estimado de entrega: ${ pedido.demora}`}</h3>
                  <h3 style={{textDecoration:"underline"}}>¿Desea confirmar el pedido?</h3>
                  <div className="d-flex gap-2">
                      <ConfirmarButton onClick={()=>confirmarPedido()}>Confirmar</ConfirmarButton>
                      <ConfirmarButton onClick={()=>cancelarPedido()}>Cancelar</ConfirmarButton>
                  </div>
                </div>
              )
            }
          </div>
      ) : pedido && pedido.estadoPedido.nombre === "PENDIENTE_DE_PAGO" ? (
        <div className="seccion-estado">
          <h1>Envíe el comprobante al WhatsApp</h1>
          {/* Mensaje específico para el estado "CONFIRMAR" */}
        </div>
      ) : pedido && pedido.estadoPedido.nombre === "CANCELADO" ? (
        <div className="seccion-estado">
          <h1>Pedido cancelado con éxito</h1>
          {/* Mensaje específico para el estado "CANCELAR" */}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}


/* 
{
              pedido.tipoEnvio === "DELIVERY" ?
              <div className="seccion-estado">
                <h3>{`Dirección: ${ pedido.direccionEntrega}`}</h3>
                <h3>{`Tiempo estimado de llegada: ${ pedido.demora} minutos.`}</h3>
                <h3>{`Costo delivery: $${ pedido.costoDelivery}`}</h3>
                <h3 style={{textDecoration:"underline"}}>¿Desea confirmar el pedido?</h3>
                <div className="d-flex gap-2">
                    <ConfirmarButton onClick={()=>confirmarPedido}>Confirmar</ConfirmarButton>
                    <ConfirmarButton onClick={()=>cancelarPedido}>Cancelar</ConfirmarButton>
                </div>
              </div>
              :
              //TAKEAWAY
              (
                <div>
                  <h3>{`Tiempo estimado de entrega: ${ pedido.demora}`}</h3>
                  <h3 style={{textDecoration:"underline"}}>¿Desea confirmar el pedido?</h3>
                  <div className="d-flex gap-2">
                      <ConfirmarButton onClick={()=>confirmarPedido}>Confirmar</ConfirmarButton>
                      <ConfirmarButton onClick={()=>cancelarPedido}>Cancelar</ConfirmarButton>
                  </div>
                </div>
              )
            } */



export default EstadoPedido