import { useState } from "react";
import { Producto } from "../../types/Producto"
import { DetallePedido } from "../../types/DetallePedido";


type ProductoProps = {
    producto:Producto,
}


const ProductoCard = ({producto}:ProductoProps) => {
    
    const [botonClickeado, setBotonClickeado] = useState(false);

    const addToCart = (producto: Producto) => {
    // Obtener el carrito del localStorage o inicializar un array vacío si no existe
    const cart: DetallePedido[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Verificar si el producto ya está en el carrito
    const existingDetail = cart.find((detail) => detail.producto.id === producto.id);

    if (existingDetail) {
        // Si el detalle del producto ya está en el carrito, incrementar su cantidad
        existingDetail.cantidadProducto += 1;
        existingDetail.subtotalPedido += existingDetail.producto.monto; // Asumiendo que el subtotal es el monto * cantidad
    } else {
        // Si no está en el carrito, crear un nuevo detalle de pedido con cantidad 1
        const newDetail: DetallePedido = {
        cantidadProducto: 1,
        subtotalPedido: producto.monto, // El subtotal del primer producto es el monto del producto
        producto: producto,
        };
        cart.push(newDetail);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    setBotonClickeado(true);

    // Restaurar el estado después de un tiempo para quitar el color verde
    setTimeout(() => {
        setBotonClickeado(false);
    }, 1000); // Cambia el tiempo a tu preferencia para mostrar el color verde
    };


  return (
    <article className='producto'>
        <div className='prod-image-container'>
        <img src='src/assets/images/default-product.jpg'/>
        </div>
        
        <div className='info-prod-container'>
            <div className='nombre-prod-container'>
            <h3>{producto.nombre}</h3>
            <p >${producto.monto}</p>
            </div>
            
            <div className='desc-container'>
            <p>{producto.descripcion}</p>
            <button
                className={botonClickeado ? 'login-button-green' : 'login-button'}
                onClick={() => addToCart(producto)}
                >
                {
                    botonClickeado ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    :
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                        Agregar al pedido
                    </>
                }
                
            </button>
            </div>
        </div>
    </article>
  )
}

export default ProductoCard