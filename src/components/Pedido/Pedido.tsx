import { useEffect, useState } from "react";
import "./Pedido.css";
import { DetallePedido } from "../../types/DetallePedido";
import { useCart } from "../../context/CartProvider";


const Pedido =()  => {
  const [detallesPedido, setDetallesPedido] = useState<DetallePedido[]>([]);
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
  
  const calcularTotalPedido = () => {
    return detallesPedido.reduce((total, detalle) => total + detalle.subtotalPedido, 0);
  };

  const totalPedido = calcularTotalPedido();

  const continuarPedido = () => {
    localStorage.setItem('totalPedido', JSON.stringify(totalPedido));
    // Aquí podrías redirigir a la siguiente página o realizar la lógica correspondiente
  };

  

  return (
    <div className="pedido"   onClick={handleClickInsidePedido}>
      <h5 style={{ marginBottom: "1rem" }}>MI PEDIDO</h5>
      {detallesPedido.map((detalle, index) => (
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
      ))}
      <div className="subtotal">
        <p>Subtotal</p>
        <p>${`${totalPedido}`}</p>
      </div>
      <button className="login-button" style={{ width: "100%" }} onClick={continuarPedido}>
        Continuar
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24"viewBox="0 0 24 24" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
      </button>
    </div>
  );
};

export default Pedido;
