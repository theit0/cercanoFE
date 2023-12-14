import { useEffect, useState } from "react";
import "./Pedido.css";
import { DetallePedido } from "../../types/DetallePedido";
import { useCart } from "../../context/CartProvider";
import { TipoEnvio } from "../../types/TipoEnvio";
import PlaceAutocomplete from "../AddressInput/PlaceAutocomplete";
import { PedidoRequests } from "../../services/Requests/PedidoRequests/PedidoRequests";
import { Pedido } from "../../types/Pedido";
import { useNavigate } from "react-router-dom";



const PedidoPopUp =()  => {


  const [detallesPedido, setDetallesPedido] = useState<DetallePedido[]>([]);
  const [tipoEnvio, setTipoEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);
  const navigate = useNavigate();


  const pedidoInitialize:Pedido = {
      id:0,
      fechaHoraPedido:new Date(),
      fechaHoraBajaPedido:new Date(),
      nombreCliente:"",
      apellidoCliente:"",
      telefonoCliente:"",
      direccionEntrega:"",
      tipoEnvio: TipoEnvio.DELIVERY,
      demora:0,
      costoDelivery:0,
      estadoPedido: {
        id:0,
        nombre:''
      },
      montoTotal:0,
      detalles:[]
  }

  const [pedido,setPedido] = useState<Pedido>(pedidoInitialize)

  const { updateCartItems } = useCart();

  const handleClickInsidePedido = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };


  useEffect(() => {
    updateCartItems(detallesPedido); // Actualizar el carrito cuando detallesPedido cambie
  }, [detallesPedido, updateCartItems]);
  
  useEffect(() => {
    const cart: DetallePedido[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setDetallesPedido(cart);
  }, []);

  const updateQuantity = (index: number, increment: boolean) => {
      setDetallesPedido((prevDetallesPedido) => {
        const updatedDetallesPedido = [...prevDetallesPedido];
        const detalle = { ...updatedDetallesPedido[index] };

        if (increment) {
          detalle.cantidadProducto += 1;
        } else {
          if (detalle.cantidadProducto > 1) {
            detalle.cantidadProducto -= 1;
          } else {
            // Filter out the specific detail to remove from the cart
            const filteredDetallesPedido = updatedDetallesPedido.filter((_, i) => i !== index);
            localStorage.setItem('cart', JSON.stringify(filteredDetallesPedido));
            setDetallesPedido(filteredDetallesPedido); // Update state with the filtered list
            return filteredDetallesPedido;
          }
        }

        // Recalculate subtotal for the updated quantity
        detalle.subtotalPedido = detalle.cantidadProducto * detalle.producto.monto;

        updatedDetallesPedido[index] = detalle;

        localStorage.setItem('cart', JSON.stringify(updatedDetallesPedido));

        
        return updatedDetallesPedido;
      });
      
  };

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  const calcularTotalPedido = () => {
    return detallesPedido.reduce((total, detalle) => total + detalle.subtotalPedido, 0);
  };

  const totalPedido = calcularTotalPedido();


  const realizarPedido = async () => {
    const clienteNombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const clienteApellido = (document.getElementById('apellido') as HTMLInputElement).value;
    const clienteTelefono = (document.getElementById('telefono') as HTMLInputElement).value;
    const direccionEntrega = tipoEnvio === TipoEnvio.DELIVERY ?
      (document.getElementById('direccionEntrega') as HTMLInputElement).value :
      ''; // Considerando que la dirección se ingresa en el campo de dirección
  
    // Validar que los campos requeridos estén completos antes de enviar el pedido
    if (!clienteNombre || !clienteApellido || !clienteTelefono ||!direccionEntrega) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    const nuevoPedido: Pedido = {
      ...pedido,
      nombreCliente: clienteNombre,
      apellidoCliente: clienteApellido,
      telefonoCliente: clienteTelefono,
      direccionEntrega: direccionEntrega,
      tipoEnvio: tipoEnvio,
      montoTotal: totalPedido, // Asignar el monto total al pedido
      detalles:detallesPedido
    };
  
    try {
      const pedidoCreado = await PedidoRequests.realizarPedido(nuevoPedido);
      localStorage.setItem('pedido', JSON.stringify(pedidoCreado));
      navigate("/espera-pedido")
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  };




  return (
    <div className="pedido"   onClick={handleClickInsidePedido}>
      <h5 style={{ marginBottom: "1rem" }}>MI PEDIDO</h5>
      {detallesPedido.length ?
      detallesPedido.map((detalle, index) => (
        <div key={index} className="detalles-pedido">
          <p>{detalle.producto.nombre}</p>
          <div className="detalle-producto">
            <div className="añadir-producto">
              <button
                style={{ border: "none", borderRight: "1px solid #C6C6C6" }}
                onClick={() => updateQuantity(index, false)}
              >
                -
              </button>
              <p>{detalle.cantidadProducto}</p>
              <button
                style={{ border: "none", borderLeft: "1px solid #C6C6C6" }}
                onClick={() => updateQuantity(index, true)}
              >
                +
              </button>
            </div>
            <p>${detalle.subtotalPedido}</p>
          </div>
        </div>
      ))
      :
        <div style={{borderTop: "1px solid #DCDCDC",padding:"1rem 0"}}>
            ¡Su pedido esta vacío!
        </div>
      }


      <div className="tipoenvio-container">
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" style={{marginLeft:".5rem"}} className="mx-2" id="nombre"/>
        </div>
        <div>
          <label htmlFor="apellido">Apellido: </label>
          <input  type="text" style={{marginLeft:".5rem"}} className="mx-2" id="apellido"/>
        </div>
        <div>
          <label htmlFor="telefono">Telefono: </label>
          <input type="text"  style={{marginLeft:".5rem"}} id="telefono"/>
        </div>
        <div>
          <label htmlFor="tipoEnvio">Tipo de Envío: </label>
          <select id="tipoEnvio" value={tipoEnvio} onChange={(e) => setTipoEnvio(e.target.value as TipoEnvio)}>
            <option value={TipoEnvio.DELIVERY}>{TipoEnvio[TipoEnvio.DELIVERY]}</option>
            <option value={TipoEnvio.TAKE_AWAY}>TAKEAWAY</option>
          </select>
        </div>
        {
          TipoEnvio[tipoEnvio] === 'DELIVERY' && 
          /* <div>
            <label htmlFor="direccionEntrega">DIRECCIÓN: </label>
            <input style={{marginLeft:".5rem"}} className="mx-2" id="direccionEntrega"/>
          </div> */
          <div>
              <label>Dirección:</label>
              <PlaceAutocomplete apiKey={apiKey} />
          </div>
        }
      </div>
      



      <div className="subtotal">
        <p>Subtotal</p>
        <p>${`${totalPedido}`}</p>
      </div>
      <button className="login-button" style={{ width: "100%" }} onClick={()=>realizarPedido()}>
        REALIZAR PEDIDO
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24"viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
      </button>
    </div>
  );
};

export default PedidoPopUp;
