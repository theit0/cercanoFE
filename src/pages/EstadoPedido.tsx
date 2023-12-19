import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PedidoRequests } from "../services/Requests/PedidoRequests/PedidoRequests";
import { Pedido } from "../types/Pedido";
import "./styles/EstadoPedido.css"
import { Spinner } from "react-bootstrap";

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

  return (
    <div className="espera-pedido">
        {
          pedido && pedido.estadoPedido.nombre === "EN_ESPERA" ?
            <div className="en-espera">
              <h1>PEDIDO EN ESPERA</h1>
              <h3>{`${pedido.nombreCliente}, PORFAVOR NO ABANDONE LA PÁGINA.`}</h3>
              <h4>En instantes se le confirmara si su pedido puede ser preaparado.</h4>
              <Spinner/>
            </div>
          : (
            <Spinner/>
          )
        }
    </div>
  )
}

export default EstadoPedido