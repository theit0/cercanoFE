
import './styles/Home.css';
import { CategoriaRequests } from '../services/Requests/CategoriaRequests/CategoriaRequests';
import { useEffect, useState } from 'react';
import { Categoria } from '../types/Categoria';
import { Producto } from '../types/Producto';
import { ProductoRequests } from '../services/Requests/ProductoRequests/ProductoRequests';
import { DetallePedido } from '../types/DetallePedido';

const Home = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

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
  };


  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await CategoriaRequests.getCategorias();
      setCategorias(categorias);
    };

    const fetchProductos = async () => {
      const productos = await ProductoRequests.getProductos();
      setProductos(productos);
    };

    fetchCategorias();
    fetchProductos();
  }, []);


  //Navegar suavemente hacia la categoria
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className='productos-section'>

      <section className='select-categorias'>
        <button className='goUp-button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-up" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg>
        </button>
        {categorias.map((cat) => {
          return (
            <button onClick={() => scrollToCategory(cat.nombreCategoria)} className='cat-button'  key={cat.id} >
              {cat.nombreCategoria}
            </button>
          );
        })}
      </section>

      {categorias.map((cat) => (
        <div key={cat.id} id={`${cat.nombreCategoria}`}>
          <h2>{cat.nombreCategoria}</h2>
          <div className='categoria-container'>
            {productos
              .filter((prod) => prod.categoria.id === cat.id)
              .map((filteredProd) => {
                return (
                  <article className='producto'>
                              <div className='prod-image-container'>
                                <img src='src/assets/images/default-product.jpg'/>
                              </div>
                              
                              <div className='info-prod-container'>
                                  <div className='nombre-prod-container'>
                                    <h3>{filteredProd.nombre}</h3>
                                    <p >${filteredProd.monto}</p>
                                  </div>
                                  
                                  <div className='desc-container'>
                                    <p>{filteredProd.descripcion}</p>
                                    <button className='login-button'  onClick={() => addToCart(filteredProd)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                        Agregar al pedido
                                    </button>
                                  </div>
                              </div>

                          </article>
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;





/* const { getAccessTokenSilently } = useAuth0();

  const [categorias,setCategorias] = useState<Categoria[]>([]);

  const obtenerCategorias = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getCategorias();
        setCategorias(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  obtenerCategorias();

  console.log(categorias) */